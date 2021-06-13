import { JwtService } from "@devslane/jwt-service-node";
import { APP_IDENTIFIER, ENV_JWT_SECRET } from "../../utils/secrets.util";

class JwtFactory {
    static getInstance(): JwtService {
        return JwtService.create({
            jwtIssuer: APP_IDENTIFIER,
            jwtSecret: ENV_JWT_SECRET,

          expiryTimeMS: 30 * 24 * 60 * 60 * 1000 // 30 Days in ms
        });
    }
}

export const jwtService = JwtFactory.getInstance();
