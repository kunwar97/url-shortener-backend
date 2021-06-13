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
exports.errorHandler = void 0;
const http_exception_1 = require("../exceptions/root/http.exception");
const internal_exception_1 = require("../exceptions/root/internal.exception");
exports.errorHandler = (method) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield method(req, res, next);
    }
    catch (error) {
        let exception;
        if (http_exception_1.HttpException.prototype.isPrototypeOf(error)) {
            exception = error;
        }
        else {
            exception = new internal_exception_1.InternalException("Something went wrong...", http_exception_1.ApiErrorCode.UNKNOWN, error);
        }
        console.error(error);
        res.status(exception.statusCode).json({
            message: exception.message,
            code: exception.errorCode,
            meta: exception.meta,
            errors: exception.errors
        });
    }
});
//# sourceMappingURL=error-handler.js.map