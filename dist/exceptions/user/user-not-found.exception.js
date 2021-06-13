"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const model_not_found_exception_1 = require("../root/model-not-found.exception");
const http_exception_1 = require("../root/http.exception");
class UserNotFoundException extends model_not_found_exception_1.ModelNotFoundException {
    constructor() {
        super("User Not Found!", http_exception_1.ApiErrorCode.USER_NOT_FOUND);
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=user-not-found.exception.js.map