import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/users.repository";
import { post, requestBody, HttpErrors } from "@loopback/rest";
import { Users } from "../models/users";
import { sign } from "jsonwebtoken";
//  import { bcrypt } from "bcrypt"; new style
let bcrypt = require('bcrypt'); // old style
// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }

  @post('/registration')
  async registerUser(@requestBody() user: Users) {
    // Check that required fields are supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // Check that user does not already exist
    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    let userToCreate = new Users();
    userToCreate.username = user.username;
    userToCreate.email = user.email;
    //userToCreate.password = user.password;
    userToCreate.password = await bcrypt.hash(user.password, 10);

    let createdUser = await this.userRepo.create(userToCreate);

    let jwt = sign(
      {
        user: {
          username: createdUser.username,
          email: createdUser.email
        },
      },
      'shh',
      {
        issuer: 'auth.ix.com',
        audience: 'ix.com',
      },
    );

    return {
      token: jwt,
    };
  }
}
