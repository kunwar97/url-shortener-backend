"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static handleError(res, exception) {
        res.statusCode = exception.statusCode;
        res.json({
            code: exception.errorCode,
            message: exception.message,
            errors: exception.errors
        });
        return;
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.utils.js.map