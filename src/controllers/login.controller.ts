import { UserRepository } from "../repositories/users.repository";
import { repository } from "@loopback/repository";
import { param, post, requestBody, HttpErrors, get } from "@loopback/rest";
import { Users } from "../models/users";
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from "bcrypt"

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

      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // create a founduser object and fetch all their data.
    let foundUser = await this.userRepo.findOne({
      where: {
        email: user.email
      },
    }) as Users;

    // this is so we can decrypt the bcrypt password
    if (!(await bcrypt.compare(user.password, foundUser.password))) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let jwt = sign({
      user: {
        user_id: foundUser.user_id,
        email: foundUser.email,
        // firstname: foundUser.firstname,
        // lastname: foundUser.lastname,
        // photo_url: foundUser.photo_url
      }
    },
      // the password here is the signature.
      "shh",
      {
        issuer: "auth.ix.co.za",
        audience: 'ix.co.za'
      });
    return {
      token: jwt
    };
  }

}
