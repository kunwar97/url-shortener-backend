"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, meta, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.meta = meta;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ApiErrorCode;
(function (ApiErrorCode) {
    // User Related
    ApiErrorCode[ApiErrorCode["VERSION_MISMATCH"] = 100] = "VERSION_MISMATCH";
    ApiErrorCode[ApiErrorCode["USER_NOT_FOUND"] = 101] = "USER_NOT_FOUND";
    ApiErrorCode[ApiErrorCode["USER_ALREADY_EXISTS"] = 102] = "USER_ALREADY_EXISTS";
    ApiErrorCode[ApiErrorCode["USER_DEACTIVATED"] = 103] = "USER_DEACTIVATED";
    ApiErrorCode[ApiErrorCode["WRONG_PASSWORD"] = 104] = "WRONG_PASSWORD";
    ApiErrorCode[ApiErrorCode["GENERAL_THROTTLING"] = 8101] = "GENERAL_THROTTLING";
    ApiErrorCode[ApiErrorCode["GENERAL_NOT_FOUND"] = 8102] = "GENERAL_NOT_FOUND";
    // JWT
    ApiErrorCode[ApiErrorCode["JWT_INVALID"] = 9101] = "JWT_INVALID";
    ApiErrorCode[ApiErrorCode["JWT_INCORRECT_PAYLOAD_TYPE"] = 9102] = "JWT_INCORRECT_PAYLOAD_TYPE";
    ApiErrorCode[ApiErrorCode["VALIDATION_ERROR"] = 9998] = "VALIDATION_ERROR";
    ApiErrorCode[ApiErrorCode["UNKNOWN"] = 9999] = "UNKNOWN"; // Reserved...
})(ApiErrorCode = exports.ApiErrorCode || (exports.ApiErrorCode = {}));
//# sourceMappingURL=http.exception.js.map