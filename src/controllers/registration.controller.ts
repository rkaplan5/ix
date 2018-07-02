import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { post, requestBody } from "@loopback/rest";
import { Users } from "../models/users";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post("/registration")
  async createUser(
    @requestBody() user: Users
  ): Promise<Users> {

    let createdUser = await this.userRepo.create(user);
    return createdUser;
  }
}
