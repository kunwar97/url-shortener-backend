import { TransformerAbstract } from "./transformer.abstract";
import { UrlLog } from "../entity/url-log.model";
import { Dictionary } from "async";


export class UrlLogTransformer extends TransformerAbstract<UrlLog> {

    protected _map(log: UrlLog): Dictionary<any> {
        return {
            id: log.id,
            ip_address: log.ip_address,
            url_id: log.url_id,
            user_agent: log.user_agent,
            created_at: log.created_at,
        };
    }

}
