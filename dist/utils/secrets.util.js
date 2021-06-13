"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_REDIS_PASSWORD = exports.ENV_REDIS_PORT = exports.ENV_REDIS_HOST = exports.ENV_CRYPT_IV = exports.ENV_CRYPT_KEY = exports.ENV_JWT_SECRET = exports.ENV_BASE_URL = exports.ENV = exports.ENV_DB_PORT = exports.ENV_DB_HOST = exports.ENV_DB_NAME = exports.ENV_APP_PORT_REST = exports.APP_IDENTIFIER = exports.IS_PRODUCTION = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
exports.ENVIRONMENT = process.env.APP_ENV;
exports.IS_PRODUCTION = exports.ENVIRONMENT === "production"; // Anything else is treated as "dev"
exports.APP_IDENTIFIER = process.env.APP_IDENTIFIER;
exports.ENV_APP_PORT_REST = +process.env.APP_PORT_REST;
exports.ENV_DB_NAME = process.env.DATABASE_NAME;
exports.ENV_DB_HOST = process.env.DATABASE_HOST || "localhost";
exports.ENV_DB_PORT = +process.env.DATABASE_PORT || 27017;
exports.ENV = process.env.APP_ENV;
exports.ENV_BASE_URL = process.env.BASE_URL;
exports.ENV_JWT_SECRET = process.env.JWT_SECRET;
exports.ENV_CRYPT_KEY = process.env.CRYPT_KEY;
exports.ENV_CRYPT_IV = process.env.CRYPT_IV;
exports.ENV_REDIS_HOST = process.env.REDIS_HOST;
exports.ENV_REDIS_PORT = process.env.REDIS_PORT;
exports.ENV_REDIS_PASSWORD = process.env.REDIS_PASSWORD;
//# sourceMappingURL=secrets.util.js.map