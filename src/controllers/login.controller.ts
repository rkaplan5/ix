import { UserRepository } from "../repositories/users.repository";
import { repository } from "@loopback/repository";
import { param, get } from "@loopback/rest";
import { Users } from "../models/users";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class LoginController {
  constructor(

    @repository(UserRepository.name) private userRepo: UserRepository

  ) { }

  @get("/login")
  async LogIn(
    @param.query.string("email") email: string
  ): Promise<Array<Users>> {

    return await this.userRepo.find({
      where: {
        email
      }
    })

  }
}

