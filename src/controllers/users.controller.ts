import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
import { get, param } from "@loopback/rest";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class UsersController {
  constructor(
@repository(UserRepository.name) private userRepo: UserRepository
) {}

@get('/users')
async getAllUsers(): Promise<Array<Users>> {
return await this.userRepo.find();
}

@get('/user/{id}') 
async getOneUser(
  @param.query.string("id") id: string): Promise<Users[]> {
return await this.userRepo.find({
  where: {
    user: id
  }
});

  }
}
