import { NextFunction, Request, Response } from "express";
import { UrlDto } from "../dtos/url.dto";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { UrlCreateValidator } from "../validators/url/url-create.validator";
import { urlService } from "../services/entities/url.service";
import { UrlAlreadyExistsException } from "../exceptions/url/url-already-exists.exception";
import { UrlTransformer } from "../transformers/url.transformer";
import { UrlNotFoundException } from "../exceptions/url/url-not-found.exception";
import moment from "moment";
import { UrlExpiredException } from "../exceptions/url/url-expired.exception";
import { DateInvalidException } from "../exceptions/date-invalid.exception";
import { urlLogService } from "../services/entities/url-log.service";

export class UrlController {

    static async createShortUrl(req: Request, res: Response, next: NextFunction) {
        const inputData = req.body as UrlDto;

        try {
            await (new UrlCreateValidator().validate(inputData));
        } catch (e) {
            throw new UnprocessableEntityException(e);
        }

        if (inputData.custom_url && !!(await urlService.showByCode(inputData.custom_url))) {
            throw new UrlAlreadyExistsException();
        }

        if (inputData.expiry_time && moment(inputData.expiry_time).isSameOrBefore(moment())) {
            throw new DateInvalidException();
        }

        const url = await urlService.store(inputData, req.user);

        return res.json({
            data: await new UrlTransformer().transform(url),
        });
    }

    static async redirect(req: Request, res: Response, next: NextFunction) {
        const code = req.params.code;

        const url = await urlService.showByCode(code);

        if (!url) {
            throw new UrlNotFoundException();
        }

        if (moment().isSameOrAfter(moment(url.expiry_time))) {
            throw new UrlExpiredException();
        }

        let ip = req.headers["x-forwarded-for"] as string || req.ip;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
        }

        urlLogService.logUrlVisit(url, ip, req.headers["user-agent"]);
        return res.redirect(url.original_url);
    }


}
