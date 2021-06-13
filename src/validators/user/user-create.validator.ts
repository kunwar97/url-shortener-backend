import { BaseValidator } from "../base.validator";

export class UserCreateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "user/user-create.schema.json";
    }
}
