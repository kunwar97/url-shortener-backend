import { ApiErrorCode, HttpException } from "../root/http.exception";
import { ModelAlreadyExistsException } from "../root/model-already-exists.exception";

export class UrlExpiredException extends HttpException {

  constructor() {
    super("Provided Url has Expired!", ApiErrorCode.URL_EXPIRED, 410);
  }
}
