"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTransformer = void 0;
const transformer_abstract_1 = require("./transformer.abstract");
class UserTransformer extends transformer_abstract_1.TransformerAbstract {
    _map(user) {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };
    }
}
exports.UserTransformer = UserTransformer;
//# sourceMappingURL=user.transformer.js.map