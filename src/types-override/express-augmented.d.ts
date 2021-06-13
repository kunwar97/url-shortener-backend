import { User } from "../entity/user.model";

declare module "express" {

  export interface Request {
    user: User;
  }
}
