import { UnauthorizedException } from "./root/unauthorized.exception";
import { ApiErrorCode } from "./root/http.exception";

export class InvalidJwtTokenException extends UnauthorizedException {

  constructor() {
    super("Session Expired. Log In Again", ApiErrorCode.JWT_INVALID);
  }
}
