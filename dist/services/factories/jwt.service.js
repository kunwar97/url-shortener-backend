"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jwt_service_node_1 = require("@devslane/jwt-service-node");
const secrets_util_1 = require("../../utils/secrets.util");
class JwtFactory {
    static getInstance() {
        return jwt_service_node_1.JwtService.create({
            jwtIssuer: secrets_util_1.APP_IDENTIFIER,
            jwtSecret: secrets_util_1.ENV_JWT_SECRET,
            expiryTimeMS: 30 * 24 * 60 * 60 * 1000 // 30 Days in ms
        });
    }
}
exports.jwtService = JwtFactory.getInstance();
//# sourceMappingURL=jwt.service.js.map