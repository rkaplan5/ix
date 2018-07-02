import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class RegistrationController {
    private userRepo;
    constructor(userRepo: UserRepository);
    createUser(user: Users): Promise<Users>;
}
