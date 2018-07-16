import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UserRepository);
    verifyToken(jwt: string): string | object;
    loginUser(user: Users): Promise<{
        token: string;
    }>;
}
