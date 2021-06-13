import { UrlDto } from "../../dtos/url.dto";
import { Url } from "../../entity/url.model";
import { User } from "../../entity/user.model";
import MD5 from "crypto-js/md5";

export class UrlService {
    private constructor() {
    }

    static getInstance(): UrlService {
        return new UrlService();
    }

    async showById(id: string): Promise<Url | undefined> {
        return Url.findOne(id);
    }

    async showByCode(code: string): Promise<Url | undefined> {
        return Url.findOne({
            url_code: code
        });
    }

    async listByUser(user: User): Promise<[Url[], number]> {
        return Url.findAndCount({
            where: {
                user_id: user.id
            }
        });
    }

    async store(data: UrlDto, user: User): Promise<Url> {
        const url = new Url();
        url.original_url = data.original_url;

        if (data.expiry_time) {
            url.expiry_time = data.expiry_time;
        }

        if (data.custom_url) {
            url.url_code = data.custom_url;
        } else {
            url.url_code = this.generateUrlCode(url.original_url);
        }

        url.user_id = user.id;
        return url.save();
    }

    async update(url: Url, data: UrlDto): Promise<Url> {
        if (data.original_url) {
            url.original_url = data.original_url;
        }

        if (data.custom_url) {
            url.url_code = data.custom_url;
        }

        if (data.expiry_time) {
            url.expiry_time = data.expiry_time;
        }

        return url.save();
    }

    async delete(url: Url): Promise<Url> {
        return url.remove();
    }

    generateUrlCode(url: string): string {
        return new Buffer(MD5(url).toString()).toString("base64").substr(0, 8);
    }
}

export const urlService = UrlService.getInstance();
