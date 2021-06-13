import { Url } from "../../entity/url.model";
import { UrlLog } from "../../entity/url-log.model";
import { urlService } from "./url.service";


export class UrlLogService {

    private constructor() {
    }

    static getInstance(): UrlLogService {
        return new UrlLogService();
    }

    async logUrlVisit(urlCode: string, ip: string, user_agent: string): Promise<UrlLog> {
        const url = await urlService.showByCode(urlCode);
        const log = new UrlLog();
        log.url_id = url.id;
        log.ip_address = ip;
        log.user_agent = user_agent;
        return log.save();
    }

    async getAnalytics(url: Url): Promise<UrlLog[]> {
        return UrlLog.find({
            where: {
                url_id: url.id
            },
            order: {
                created_at: "DESC"
            }
        });
    }
}

export const urlLogService = UrlLogService.getInstance();
