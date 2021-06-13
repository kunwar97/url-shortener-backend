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
exports.userService = void 0;
const user_model_1 = require("../../entity/user.model");
const crypt_service_1 = require("../factories/crypt.service");
class UserService {
    constructor() {
    }
    static getInstance() {
        return new UserService();
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.find();
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne(id);
        });
    }
    showByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne({
                email: email
            });
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User();
            user.first_name = data.first_name;
            user.last_name = data.last_name;
            user.email = data.email;
            user.password = crypt_service_1.cryptService.hashSync(data.password);
            return user.save();
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user.remove();
        });
    }
}
exports.userService = UserService.getInstance();
//# sourceMappingURL=user.service.js.map