"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteNotFoundException = void 0;
const http_exception_1 = require("./root/http.exception");
class RouteNotFoundException extends http_exception_1.HttpException {
    constructor() {
        super(RouteNotFoundException.MESSAGE, http_exception_1.ApiErrorCode.GENERAL_NOT_FOUND, 404);
    }
}
exports.RouteNotFoundException = RouteNotFoundException;
RouteNotFoundException.MESSAGE = "Endpoint doesn't exist.";
//# sourceMappingURL=route-not-found.exception.js.map