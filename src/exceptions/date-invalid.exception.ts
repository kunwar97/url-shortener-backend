import { ModelNotFoundException } from "./root/model-not-found.exception";
import { ApiErrorCode } from "./root/http.exception";

export class DateInvalidException extends ModelNotFoundException {
    constructor() {
        super("Date is Invalid", ApiErrorCode.DATE_INVALID);
    }
}
