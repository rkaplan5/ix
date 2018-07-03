import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
import { get, param, HttpErrors } from "@loopback/rest";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class UserController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }

  @get('/users')
  async findUsers(): Promise<Users[]> {
    return await this.userRepo.find();
  }

  @get('/users/{id}')
  async findUsersById(@param.path.number('id') id: number): Promise<Users> {
    // Check for valid ID
    let userExists: boolean = !!(await this.userRepo.count({ id }));

    if (!userExists) {
      throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
    }

    return await this.userRepo.findById(id);
  }
}
