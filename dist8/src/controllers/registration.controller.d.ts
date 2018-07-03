import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class RegistrationController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    registerUser(user: Users): Promise<Users>;
}
