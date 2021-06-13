"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const secrets_util_1 = require("./utils/secrets.util");
const crypt_service_1 = require("./services/factories/crypt.service");
const jwt_service_1 = require("./services/factories/jwt.service");
const validator_service_1 = require("./services/factories/validator.service");
const user_service_1 = require("./services/entities/user.service");
const error_handler_1 = require("./handlers/error-handler");
const user_controller_1 = require("./controller/user.controller");
const user_middleware_1 = require("./middlewares/user.middleware");
const compression = require("compression");
const appErrorHandler = require("errorhandler");
class Application {
    constructor(port) {
        this.ALLOWED_ORIGINS = [];
        this.APP = express_1.default();
        this.PORT = port;
        this.setupCORS();
        this.initServices();
        this.initGlobalMiddleware();
        this.initRoutes();
    }
    initRoutes() {
        this.APP.use("/public", express_1.default.static("public", { maxAge: 31557600000 }));
        this.APP.post("/signup", error_handler_1.errorHandler(user_controller_1.UserController.store));
        this.APP.post("/login", error_handler_1.errorHandler(user_controller_1.UserController.authenticate));
        this.APP.post("/me", [user_middleware_1.userMiddleware], error_handler_1.errorHandler(user_controller_1.UserController.me));
    }
    initServices() {
        crypt_service_1.cryptService;
        jwt_service_1.jwtService;
        validator_service_1.validatorService;
        user_service_1.userService;
    }
    start() {
        this.APP.listen(this.PORT, () => {
            console.log(`App Started on PORT: ${this.PORT}`);
        });
    }
    setupCORS() {
        this.APP.use(cors_1.default({
            origin: (origin, callback) => {
                if (!origin || this.ALLOWED_ORIGINS.includes(origin)) {
                    callback(undefined, true);
                }
                else {
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
    initGlobalMiddleware() {
        this.APP.set("port", process.env.PORT || secrets_util_1.ENV_APP_PORT_REST);
        this.APP.use(body_parser_1.default.json());
        this.APP.use(body_parser_1.default.urlencoded({ extended: true }));
        this.APP.use(compression({
            level: 3
        }));
        if (secrets_util_1.IS_PRODUCTION) {
            this.APP.use(appErrorHandler());
        }
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map