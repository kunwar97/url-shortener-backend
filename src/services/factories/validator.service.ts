import { ValidatorService } from "@devslane/validator-service-node";

class ValidatorFactory {
  private static _instance: ValidatorService;

  static getInstance(): ValidatorService {
    this._instance = ValidatorService.init({
      baseSchemaPath: "schema"
    });

    // Add Custom Keywords here...
    this._instance.registerKeywords([]);
    return this._instance;
  }
}

export const validatorService = ValidatorFactory.getInstance();
