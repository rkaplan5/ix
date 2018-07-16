import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class UserController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    findUsers(jwt: string): Promise<Users[]>;
    findUsersById(id: number): Promise<Users>;
}
