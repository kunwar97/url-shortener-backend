"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptService = void 0;
const crypt_service_node_1 = require("@devslane/crypt-service-node");
const secrets_util_1 = require("../../utils/secrets.util");
class CryptFactory {
    static getInstance() {
        return crypt_service_node_1.CryptService.create({
            saltRounds: 10,
            crypt: {
                alg: crypt_service_node_1.CryptAlg.AES_256_CBC,
                key: secrets_util_1.ENV_CRYPT_KEY,
                iv: secrets_util_1.ENV_CRYPT_IV
            }
        });
    }
}
exports.cryptService = CryptFactory.getInstance();
//# sourceMappingURL=crypt.service.js.map