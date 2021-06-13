import { User } from "../../entity/user.model";
import { UserDto } from "../../dtos/user.dto";
import { cryptService } from "../factories/crypt.service";

class UserService {

    private constructor() {
    }

    static getInstance(): UserService {
        return new UserService();
    }

    async index(): Promise<User[]> {
        return User.find();
    }

    async show(id: string): Promise<User | undefined> {
        return User.findOne(id);
    }

    async showByEmail(email: string): Promise<User | undefined> {
        return User.findOne({
            email: email
        });
    }

    async store(data: UserDto): Promise<User> {
        const user = new User();
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.email = data.email;
        user.password = cryptService.hashSync(data.password);
        return user.save();
    }

    async delete(user: User): Promise<User> {
        return user.remove();
    }

}

export const userService = UserService.getInstance();
