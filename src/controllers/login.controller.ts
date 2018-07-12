import { UserRepository } from "../repositories/users.repository";
import { repository } from "@loopback/repository";
import { param, post, requestBody, HttpErrors, get } from "@loopback/rest";
import { Users } from "../models/users";
import { sign, verify } from 'jsonwebtoken';

// import {inject} from '@loopback/context';

export class LoginController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  //log in
  @get("/verify")
  verifyToken(@param.query.string("jwt") jwt: string) { // asking for the JWT token
    try {
      let payload = verify(jwt, "shh");
      return payload;
    } catch (err) {
      throw new HttpErrors.Unauthorized("invalid token");
    }
  }
  // the user is then authenitated and then can proceed

  // need to create a "sign" which checks the JWT

  @post("/login") // log in end point
  async loginUser(@requestBody() user: Users) {
    // Check that both email or password are filled in on log in screen
    if (!user.email || !user.password) {  // ! means if doesnt exist its wrong
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // create userexists if its true that email and password are both in the repository.db and match
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // create a founduser object and fetch all their data.
    let foundUser = await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    }) as Users;

    // give a JWT access token to founduser as they passed security
    let jwt = sign({
      user: {
        id: foundUser.id,
        email: foundUser.email
      }
    },
      // the password here is the signature.
      "shh",
      {
        issuer: "auth.ix.co.za",
        audience: 'ix.co.za'
      });

    // return the jwt which is the data and the password.
    return {
      token: jwt,
    };
  }
}
