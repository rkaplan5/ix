import { UserRepository } from "../repositories/users.repository";
import { repository } from "@loopback/repository";
import { param, post, requestBody, HttpErrors } from "@loopback/rest";
import { Users } from "../models/users";

// import {inject} from '@loopback/context';

export class LoginController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post("/login")
  async LogIn(@requestBody() user: Users): Promise<Users> {
    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    return await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    }) as Users;
  }
}


