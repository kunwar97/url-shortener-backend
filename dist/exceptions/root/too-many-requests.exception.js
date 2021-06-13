"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestsException = void 0;
const http_exception_1 = require("./http.exception");
class TooManyRequestsException extends http_exception_1.HttpException {
    constructor(message = TooManyRequestsException.MESSAGE, errorCode = http_exception_1.ApiErrorCode.GENERAL_THROTTLING, meta) {
        super(message, errorCode, 429, meta);
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
TooManyRequestsException.MESSAGE = "Too many requests, please try again later.";
//# sourceMappingURL=too-many-requests.exception.js.map