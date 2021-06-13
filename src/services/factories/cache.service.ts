import { Client } from "memjs";
import { ENV_MEMCACHE_PASSWORD, ENV_MEMCACHE_URL, ENV_MEMCACHE_USERNAME } from "../../utils/secrets.util";

class CacheService {
    static getInstance() {
        return Client.create(
            ENV_MEMCACHE_URL,
            {
                username: ENV_MEMCACHE_USERNAME,
                password: ENV_MEMCACHE_PASSWORD,
                keepAlive: true,
                timeout: 1,
            }
        );
    }

}

export const cacheService = CacheService.getInstance();
