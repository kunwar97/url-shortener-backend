import { Connection, createConnection } from "typeorm";
import { ENV_DB_HOST, ENV_DB_NAME, ENV_DB_PORT } from "../../utils/secrets.util";

class DBService {
    static getInstance(): Promise<Connection> {
        return createConnection({
            type: "mongodb",
            host: ENV_DB_HOST,
            port: ENV_DB_PORT,
            database: ENV_DB_NAME,
            logging: "all",
            synchronize: true,
            cache: true,
            useUnifiedTopology: true,
            entities: [
                "dist/entity/*.js"
            ],
            cli: {
                "entitiesDir": "src/entity"
            }
        });
    }
}

export const dbService = DBService.getInstance();
