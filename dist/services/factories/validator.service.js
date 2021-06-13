"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorService = void 0;
const validator_service_node_1 = require("@devslane/validator-service-node");
class ValidatorFactory {
    static getInstance() {
        this._instance = validator_service_node_1.ValidatorService.init({
            baseSchemaPath: "schema"
        });
        // Add Custom Keywords here...
        this._instance.registerKeywords([]);
        return this._instance;
    }
}
exports.validatorService = ValidatorFactory.getInstance();
//# sourceMappingURL=validator.service.js.map