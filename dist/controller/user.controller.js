"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/entities/user.service");
const user_not_found_exception_1 = require("../exceptions/user/user-not-found.exception");
const unprocessable_entity_exception_1 = require("../exceptions/root/unprocessable-entity.exception");
const user_login_validator_1 = require("../validators/user/user-login.validator");
const wrong_password_exception_1 = require("../exceptions/user/wrong-password.exception");
const crypt_service_1 = require("../services/factories/crypt.service");
const jwt_service_1 = require("../services/factories/jwt.service");
const user_create_validator_1 = require("../validators/user/user-create.validator");
const user_transformer_1 = require("../transformers/user.transformer");
class UserController {
    static index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.userService.index();
            return res.json({
                data: yield new user_transformer_1.UserTransformer().transformList(users)
            });
        });
    }
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.userService.show(req.params.id);
            if (!user) {
                throw new user_not_found_exception_1.UserNotFoundException();
            }
            return res.json({
                data: yield new user_transformer_1.UserTransformer().transform(user)
            });
        });
    }
    static store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputData = req.body;
            try {
                yield (new user_create_validator_1.UserCreateValidator().validate(inputData));
            }
            catch (e) {
                throw new unprocessable_entity_exception_1.UnprocessableEntityException(e);
            }
            const user = yield user_service_1.userService.store(inputData);
            return res.json({
                data: yield new user_transformer_1.UserTransformer().transform(user)
            });
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.userService.show(req.params.id);
            if (!user) {
                throw new user_not_found_exception_1.UserNotFoundException();
            }
            yield user_service_1.userService.delete(user);
            return res.json({
                status: "DELETED"
            });
        });
    }
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputData = req.body;
            try {
                yield (new user_login_validator_1.UserLoginValidator().validate(inputData));
            }
            catch (e) {
                throw new unprocessable_entity_exception_1.UnprocessableEntityException(e);
            }
            const user = yield user_service_1.userService.showByEmail(inputData.email);
            if (!user || !crypt_service_1.cryptService.compareHashSync(inputData.password, user.password)) {
                throw new wrong_password_exception_1.WrongPasswordException();
            }
            return res.json({
                token: jwt_service_1.jwtService.generateUserToken(user.id.toString(), {
                    customClaims: null,
                    expires: true,
                }),
                user: yield new user_transformer_1.UserTransformer().transform(user),
            });
        });
    }
    static me(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({
                data: yield new user_transformer_1.UserTransformer().transform(req.user)
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map