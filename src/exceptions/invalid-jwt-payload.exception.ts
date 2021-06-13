import { UnauthorizedException } from "./root/unauthorized.exception";
import { ApiErrorCode } from "./root/http.exception";

export class InvalidJwtPayloadException extends UnauthorizedException {

  constructor() {
    super("Session Expired. Log In Again", ApiErrorCode.JWT_INCORRECT_PAYLOAD_TYPE);
  }
}
