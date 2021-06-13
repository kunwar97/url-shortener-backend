import { TransformerAbstract } from "./transformer.abstract";
import { Url } from "../entity/url.model";
import { Dictionary } from "async";
import { ENV_BASE_URL } from "../utils/secrets.util";


export class UrlTransformer extends TransformerAbstract<Url> {

    protected _map(url: Url): Dictionary<any> {
        return {
            id: url.id,
            original_url: url.original_url,
            short_url: `${ENV_BASE_URL}/${url.url_code}`,
            url_code: url.url_code,
            user_id: url.user_id,
            expiry_time: url.expiry_time,
            requires_password: url.requires_password,
            username: url.username,
            created_at: url.created_at
        };
    }

}
