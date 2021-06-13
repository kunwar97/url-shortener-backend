"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityException = void 0;
const http_exception_1 = require("./http.exception");
class UnprocessableEntityException extends http_exception_1.HttpException {
    constructor(errors, message = UnprocessableEntityException.MESSAGE, errorCode = http_exception_1.ApiErrorCode.VALIDATION_ERROR, meta) {
        super(message, errorCode, 422, meta, errors);
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;
UnprocessableEntityException.MESSAGE = "Validation Error";
//# sourceMappingURL=unprocessable-entity.exception.js.map