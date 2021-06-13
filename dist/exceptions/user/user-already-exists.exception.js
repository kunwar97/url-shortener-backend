"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = void 0;
const http_exception_1 = require("../root/http.exception");
const model_already_exists_exception_1 = require("../root/model-already-exists.exception");
class UserAlreadyExistsException extends model_already_exists_exception_1.ModelAlreadyExistsException {
    constructor() {
        super("User Already Exists!", http_exception_1.ApiErrorCode.USER_ALREADY_EXISTS);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=user-already-exists.exception.js.map