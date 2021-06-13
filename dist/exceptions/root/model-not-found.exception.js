"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class ModelNotFoundException extends http_exception_1.HttpException {
    constructor(message, errorCode, meta) {
        super(message, errorCode, 404, meta);
    }
}
exports.ModelNotFoundException = ModelNotFoundException;
//# sourceMappingURL=model-not-found.exception.js.map