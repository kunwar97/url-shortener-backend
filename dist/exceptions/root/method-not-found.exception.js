"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class MethodNotFoundException extends http_exception_1.HttpException {
    constructor() {
        super(MethodNotFoundException.MESSAGE, http_exception_1.ApiErrorCode.GENERAL_NOT_FOUND, 405);
    }
}
exports.MethodNotFoundException = MethodNotFoundException;
MethodNotFoundException.MESSAGE = "this method is not supported on the endpoint.";
//# sourceMappingURL=method-not-found.exception.js.map