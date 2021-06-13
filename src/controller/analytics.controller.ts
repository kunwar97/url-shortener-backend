import { NextFunction, Request, Response } from "express";
import { urlService } from "../services/entities/url.service";
import { UrlNotFoundException } from "../exceptions/url/url-not-found.exception";
import { NoAccessException } from "../exceptions/user/no-access.exception";
import { urlLogService } from "../services/entities/url-log.service";
import { UrlLogTransformer } from "../transformers/url-log.transformer";

export class AnalyticsController {

    static async getAnalytics(req: Request, res: Response, next: NextFunction) {
        const code = req.params.url_code;

        const url = await urlService.showByCode(code);

        if (!url) {
            throw new UrlNotFoundException();
        }

        if (url.user_id.equals(req.user.id)) {
            throw new NoAccessException();
        }
        const logs = await urlLogService.getAnalytics(url);

        return res.json({
            data: await new UrlLogTransformer().transformList(logs)
        });
    }


}
