import { ApiErrorCode } from "../root/http.exception";
import { ModelAlreadyExistsException } from "../root/model-already-exists.exception";

export class UrlAlreadyExistsException extends ModelAlreadyExistsException {

  constructor() {
    super("Provided Custom Url Already Exists!", ApiErrorCode.URL_ALREADY_EXISTS);
  }
}
