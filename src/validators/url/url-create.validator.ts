import { BaseValidator } from "../base.validator";

export class UrlCreateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "url/url-create.schema.json";
    }
}
