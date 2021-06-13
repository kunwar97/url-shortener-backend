import dotenv from "dotenv";

dotenv.config({path: ".env"});

export const ENVIRONMENT = process.env.APP_ENV;
export const IS_PRODUCTION = ENVIRONMENT === "production"; // Anything else is treated as "dev"

export const APP_IDENTIFIER = process.env.APP_IDENTIFIER;
export const ENV_APP_PORT_REST = +process.env.APP_PORT_REST;

export const ENV_DB_NAME = process.env.DATABASE_NAME;
export const ENV_DB_HOST = process.env.DATABASE_HOST || "localhost";
export const ENV_DB_PORT = +process.env.DATABASE_PORT || 27017;


export const ENV = process.env.APP_ENV;

export const ENV_BASE_URL = process.env.BASE_URL;

export const ENV_JWT_SECRET = process.env.JWT_SECRET;

export const ENV_CRYPT_KEY = process.env.CRYPT_KEY;
export const ENV_CRYPT_IV = process.env.CRYPT_IV;

export const ENV_MEMCACHE_URL = process.env.MEMCACHE_URL;
export const ENV_MEMCACHE_USERNAME = process.env.MEMCACHE_USERNAME || undefined;
export const ENV_MEMCACHE_PASSWORD = process.env.MEMCACHE_PASSWORD || undefined;



