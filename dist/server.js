"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_util_1 = require("./utils/secrets.util");
const app_1 = require("./app");
const typeorm_1 = require("typeorm");
/**
 * Error Handler. Provides full stack - remove for production
 */
const app = new app_1.Application(secrets_util_1.ENV_APP_PORT_REST);
typeorm_1.createConnection({
    type: "mongodb",
    host: secrets_util_1.ENV_DB_HOST,
    port: secrets_util_1.ENV_DB_PORT,
    database: secrets_util_1.ENV_DB_NAME,
    logging: true,
    synchronize: true,
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
//# sourceMappingURL=server.js.map