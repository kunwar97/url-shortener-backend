import { ValidatorAbstract, ValidatorService } from "@devslane/validator-service-node";
import { validatorService } from "../services/factories/validator.service";

export abstract class BaseValidator extends ValidatorAbstract {
  protected getValidatorInstance(): ValidatorService {
    return validatorService;
  }
}