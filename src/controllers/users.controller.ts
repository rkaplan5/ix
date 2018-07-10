import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { Users } from "../models/users";
import { get, param, HttpErrors } from "@loopback/rest";
import { sign, verify } from 'jsonwebtoken'

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class UserController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }

  // anything with a backslash is the endpoint for URL
  @get('/users')
  // if the findusers has a JWT token then send the user data
  async findUsers(@param.query.string("jwt") jwt: string): Promise<Users[]> {
    try {
      let payload = verify(jwt, "shh");
      return await this.userRepo.find(); //return the .db
    } catch (err) {  //if JWT token does exist, return the error
      throw new HttpErrors.Unauthorized("invalid token");
    }
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
