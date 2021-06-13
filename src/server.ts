import { ENV_APP_PORT_REST, ENV_DB_HOST, ENV_DB_NAME, ENV_DB_PORT } from "./utils/secrets.util";
import { Application } from "./app";
import { createConnection } from "typeorm";
import "reflect-metadata";

/**
 * Error Handler. Provides full stack - remove for production
 */

const app = new Application(ENV_APP_PORT_REST);
createConnection({
    type: "mongodb",
    host: ENV_DB_HOST,
    port: ENV_DB_PORT,
    database: ENV_DB_NAME,
    logging: true,
    synchronize: true,
    useUnifiedTopology: true,
    entities: [
        __dirname + "/entity/*.js"
    ],
    migrations: [
        __dirname + "/migration/**/*.js"
    ],
    subscribers: [
        __dirname + "/subscriber/**/*.js"
    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}).then(() => {
    app.start();
});
