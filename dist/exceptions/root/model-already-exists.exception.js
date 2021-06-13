"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelAlreadyExistsException = void 0;
const http_exception_1 = require("./http.exception");
class ModelAlreadyExistsException extends http_exception_1.HttpException {
    constructor(message, errorCode, meta) {
        super(message, errorCode, 409, meta);
    }
}
exports.ModelAlreadyExistsException = ModelAlreadyExistsException;
//# sourceMappingURL=model-already-exists.exception.js.map