"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidator = void 0;
const validator_service_node_1 = require("@devslane/validator-service-node");
const validator_service_1 = require("../services/factories/validator.service");
class BaseValidator extends validator_service_node_1.ValidatorAbstract {
    getValidatorInstance() {
        return validator_service_1.validatorService;
    }
}
exports.BaseValidator = BaseValidator;
//# sourceMappingURL=base.validator.js.map