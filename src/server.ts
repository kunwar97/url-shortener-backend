import { ENV_APP_PORT_REST } from "./utils/secrets.util";
import { Application } from "./app";
import "reflect-metadata";
import { dbService } from "./services/factories/db.service";

/**
 * Error Handler. Provides full stack - remove for production
 */

const app = new Application(ENV_APP_PORT_REST);
dbService.then(() => {
    app.start();
});
