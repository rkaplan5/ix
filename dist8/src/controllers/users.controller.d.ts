import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
export declare class UsersController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<Users>>;
    getOneUser(id: number): Promise<Users[]>;
}
