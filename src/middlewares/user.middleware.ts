import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/factories/jwt.service";
import { JsonWebTokenError } from "@devslane/jwt-service-node";

import { InternalException } from "../exceptions/root/internal.exception";
import { ApiErrorCode } from "../exceptions/root/http.exception";
import { Helpers } from "../utils/helpers.utils";
import { InvalidJwtPayloadException } from "../exceptions/invalid-jwt-payload.exception";
import { InvalidJwtTokenException } from "../exceptions/invalid-jwt-token.exception";
import { userService } from "../services/entities/user.service";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.headers.authorization;

  try {
    const payload = jwtService.parseToken(jwtToken);

    if (!jwtService.isUserJwtPayload(payload)) {
      return Helpers.handleError(res, new InvalidJwtPayloadException());
    }
    const user = await userService.show(payload.sub as string);

    if (!user) {
      return Helpers.handleError(res, new InvalidJwtTokenException());
    }

    req.user = user;
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return Helpers.handleError(res, new InvalidJwtTokenException());
    } else {
      return Helpers.handleError(res, new InternalException(e.message, ApiErrorCode.UNKNOWN, e.stack));
    }
  }

  next();
};
