import { Response } from "express";
import { HttpException } from "../exceptions/root/http.exception";

export class Helpers {
    public static handleError(res: Response, exception: HttpException): void {
        res.statusCode = exception.statusCode;
        res.json({
            code: exception.errorCode,
            message: exception.message,
            errors: exception.errors
        });

        return;
    }
}
