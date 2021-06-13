import { CryptAlg, CryptService } from "@devslane/crypt-service-node";
import { ENV_CRYPT_IV, ENV_CRYPT_KEY } from "../../utils/secrets.util";

class CryptFactory {
    static getInstance(): CryptService {
        return CryptService.create({
            saltRounds: 10,
            crypt: {
                alg: CryptAlg.AES_256_CBC,
                key: ENV_CRYPT_KEY,
                iv: ENV_CRYPT_IV
            }
        });
    }
}

export const cryptService = CryptFactory.getInstance();
