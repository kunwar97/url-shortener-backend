"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jwt_service_1 = require("../services/factories/jwt.service");
const jwt_service_node_1 = require("@devslane/jwt-service-node");
const internal_exception_1 = require("../exceptions/root/internal.exception");
const http_exception_1 = require("../exceptions/root/http.exception");
const helpers_utils_1 = require("../utils/helpers.utils");
const invalid_jwt_payload_exception_1 = require("../exceptions/invalid-jwt-payload.exception");
const invalid_jwt_token_exception_1 = require("../exceptions/invalid-jwt-token.exception");
const user_service_1 = require("../services/entities/user.service");
exports.userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = req.headers.authorization;
    try {
        const payload = jwt_service_1.jwtService.parseToken(jwtToken);
        if (!jwt_service_1.jwtService.isUserJwtPayload(payload)) {
            return helpers_utils_1.Helpers.handleError(res, new invalid_jwt_payload_exception_1.InvalidJwtPayloadException());
        }
        const user = yield user_service_1.userService.show(payload.sub);
        if (!user) {
            return helpers_utils_1.Helpers.handleError(res, new invalid_jwt_token_exception_1.InvalidJwtTokenException());
        }
        req.user = user;
    }
    catch (e) {
        if (e instanceof jwt_service_node_1.JsonWebTokenError) {
            return helpers_utils_1.Helpers.handleError(res, new invalid_jwt_token_exception_1.InvalidJwtTokenException());
        }
        else {
            return helpers_utils_1.Helpers.handleError(res, new internal_exception_1.InternalException(e.message, http_exception_1.ApiErrorCode.UNKNOWN, e.stack));
        }
    }
    next();
});
//# sourceMappingURL=user.middleware.js.map