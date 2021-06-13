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
import { cacheService } from "../services/factories/cache.service";
import { NoAccessException } from "../exceptions/user/no-access.exception";
import { Url } from "../entity/url.model";

export class UrlController {

    static async listUrls(req: Request, res: Response, next: NextFunction) {
        const urls = await urlService.listByUser(req.user);

        return res.json({
            data: await new UrlTransformer().transformList(urls[0]),
            count: urls[1]
        })
    }

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
        await UrlController.cacheUrl(url);
        return res.json({
            data: await new UrlTransformer().transform(url),
        });
    }

    static async updateUrl(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const inputData = req.body as UrlDto;

        const url = await urlService.showById(id);

        if (!url) {
            throw new UrlNotFoundException();
        }

        if (url.user_id.equals(req.user.id)) {
            throw new NoAccessException();
        }

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

        const updatedUrl = await urlService.update(url, inputData);
        await UrlController.cacheUrl(updatedUrl);

        return res.json({
            data: await new UrlTransformer().transform(updatedUrl)
        });
    }

    static async deleteUrl(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        const url = await urlService.showById(id);

        if (!url) {
            throw new UrlNotFoundException();
        }

        if (url.user_id.equals(req.user.id)) {
            throw new NoAccessException();
        }

        await urlService.delete(url);
        await cacheService.delete(url.url_code);

        return res.json({
            status: "DELETED"
        });
    }

    static async redirect(req: Request, res: Response, next: NextFunction) {
        const code = req.params.code;
        let url;
        const cachedUrl = (await cacheService.get(code)).value;
        if (cachedUrl) {
            url = JSON.parse(cachedUrl.toString()) as { original_url: string, expiry_time: string };
            console.log("cache hit", url);
        } else {
            url = await urlService.showByCode(code);
            await UrlController.cacheUrl(url);
        }

        if (!url) {
            throw new UrlNotFoundException();
        }

        if (moment().isSameOrAfter(moment(url.expiry_time))) {
            if (cachedUrl) {
                await cacheService.delete(code);
            }
            throw new UrlExpiredException();
        }

        let ip = req.headers["x-forwarded-for"] as string || req.ip;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
        }

        urlLogService.logUrlVisit(code, ip, req.headers["user-agent"]);
        return res.redirect(url.original_url);
    }

    static async cacheUrl(url: Url): Promise<boolean> {
        return cacheService.set(url.url_code, JSON.stringify({
            original_url: url.original_url,
            expiry_time: url.expiry_time,
        }), {});
    }
}
