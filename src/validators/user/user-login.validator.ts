import { BaseValidator } from "../base.validator";

export class UserLoginValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "user/user-login.schema.json";
  }
}
