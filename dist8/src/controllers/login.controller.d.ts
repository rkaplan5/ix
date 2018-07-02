import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UserRepository);
    LogIn(email: string): Promise<Array<Users>>;
}
