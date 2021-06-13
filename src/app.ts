import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ENV_APP_PORT_REST, IS_PRODUCTION } from "./utils/secrets.util";
import { cryptService } from "./services/factories/crypt.service";
import { jwtService } from "./services/factories/jwt.service";
import { validatorService } from "./services/factories/validator.service";
import { userService } from "./services/entities/user.service";
import { errorHandler } from "./handlers/error-handler";
import { UserController } from "./controller/user.controller";
import { userMiddleware } from "./middlewares/user.middleware";
import { UrlController } from "./controller/url.controller";
import { AnalyticsController } from "./controller/analytics.controller";

const compression = require("compression");

const appErrorHandler = require("errorhandler");

export class Application {
    private readonly APP: express.Application;
    private readonly PORT: number;
    private readonly ALLOWED_ORIGINS: string[] = [];

    constructor(port: number) {
        this.APP = express();
        this.PORT = port;
        this.setupCORS();
        this.initServices();
        this.initGlobalMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.APP.use("/public", express.static("public", {maxAge: 31557600000}));

        this.APP.get("/:code", errorHandler(UrlController.redirect));

        this.APP.post("/signup", errorHandler(UserController.store));
        this.APP.post("/login", errorHandler(UserController.authenticate));
        this.APP.post("/me", [userMiddleware], errorHandler(UserController.me));

        this.APP.post("/short-url", [userMiddleware], errorHandler(UrlController.createShortUrl));
        this.APP.get("/analytics/:url_code", [userMiddleware], errorHandler(AnalyticsController.getAnalytics));
    }

    initServices() {
        cryptService;
        jwtService;
        validatorService;

        userService;
    }

    start(): void {
        this.APP.listen(this.PORT, () => {
            console.log(`App Started on PORT: ${this.PORT}`);
        });
    }

    private setupCORS(): void {
        this.APP.use(cors({
            origin: (origin: any, callback: (arg0: Error, arg1?: boolean) => void) => {
                if (!origin || this.ALLOWED_ORIGINS.includes(origin)) {
                    callback(undefined, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            methods: [
                "GET",
                "HEAD",
                "PUT",
                "PATCH",
                "POST",
                "DELETE"
            ],
            exposedHeaders: ["Content-Disposition"]
        }));
        this.APP.options("*");
    }


    // Express configuration
    private initGlobalMiddleware(): void {
        this.APP.set("port", process.env.PORT || ENV_APP_PORT_REST);
        this.APP.use(bodyParser.json());
        this.APP.use(bodyParser.urlencoded({extended: true}));
        this.APP.use(compression({
            level: 3
        }));

        if (IS_PRODUCTION) {
            this.APP.use(appErrorHandler());
        }
    }
}
