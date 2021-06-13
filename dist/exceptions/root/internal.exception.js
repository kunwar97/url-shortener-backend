"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalException = void 0;
const http_exception_1 = require("./http.exception");
class InternalException extends http_exception_1.HttpException {
    constructor(message, errorCode, meta) {
        super(message, errorCode, 500, meta);
    }
}
exports.InternalException = InternalException;
//# sourceMappingURL=internal.exception.js.map