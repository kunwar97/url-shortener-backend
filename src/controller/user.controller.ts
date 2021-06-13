import { NextFunction, Request, Response } from "express";
import { userService } from "../services/entities/user.service";
import { UserNotFoundException } from "../exceptions/user/user-not-found.exception";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { UserLoginValidator } from "../validators/user/user-login.validator";
import { WrongPasswordException } from "../exceptions/user/wrong-password.exception";
import { cryptService } from "../services/factories/crypt.service";
import { jwtService } from "../services/factories/jwt.service";
import { UserDto } from "../dtos/user.dto";
import { UserCreateValidator } from "../validators/user/user-create.validator";
import { UserTransformer } from "../transformers/user.transformer";

export class UserController {

    static async index(req: Request, res: Response, next: NextFunction) {
        const users = await userService.index();
        return res.json({
            data: await new UserTransformer().transformList(users)
        });
    }


    static async show(req: Request, res: Response, next: NextFunction) {
        const user = await userService.show(req.params.id);

        if (!user) {
            throw new UserNotFoundException();
        }

        return res.json({
            data: await new UserTransformer().transform(user)
        });
    }

    static async store(req: Request, res: Response, next: NextFunction) {
        const inputData = req.body as UserDto;
        try {
            await (new UserCreateValidator().validate(inputData));
        } catch (e) {
            throw new UnprocessableEntityException(e);
        }

        const user = await userService.store(inputData);

        return res.json({
            data: await new UserTransformer().transform(user)
        });
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const user = await userService.show(req.params.id);

        if (!user) {
            throw new UserNotFoundException();
        }
        await userService.delete(user);
        return res.json({
            status: "DELETED"
        });
    }

    static async authenticate(req: Request, res: Response, next: NextFunction) {
        const inputData = req.body as { email: string, password: string };

        try {
            await (new UserLoginValidator().validate(inputData));
        } catch (e) {
            throw new UnprocessableEntityException(e);
        }

        const user = await userService.showByEmail(inputData.email);

        if (!user || !cryptService.compareHashSync(inputData.password, user.password)) {
            throw new WrongPasswordException();
        }

        return res.json({
            token: jwtService.generateUserToken(user.id.toString(), {
                customClaims: null,
                expires: true,
            }),
            user: await new UserTransformer().transform(user),
        });
    }

    static async me(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await new UserTransformer().transform(req.user)
        });
    }
}
