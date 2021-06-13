import { ApiErrorCode } from "../root/http.exception";
import { ModelAlreadyExistsException } from "../root/model-already-exists.exception";
import { ModelNotFoundException } from "../root/model-not-found.exception";

export class UrlNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Provided Url Does not Exist!", ApiErrorCode.URL_NOT_FOUND);
  }
}
