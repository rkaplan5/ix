"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_repository_1 = require("../repositories/users.repository");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const users_1 = require("../models/users");
const jsonwebtoken_1 = require("jsonwebtoken");
// import {inject} from '@loopback/context';
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    //log in
    verifyToken(jwt) {
        try {
            let payload = jsonwebtoken_1.verify(jwt, "shh");
            return payload;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("invalid token");
        }
    }
    // the user is then authenitated and then can proceed
    // need to create a "sign" which checks the JWT
    async loginUser(user) {
        // Check that both email or password are filled in on log in screen
        if (!user.email || !user.password) { // ! means if doesnt exist its wrong
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // create userexists if its true that email and password are both in the repository.db and match
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email },
                { password: user.password },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // create a founduser object and fetch all their data.
        let foundUser = await this.userRepo.findOne({
            where: {
                and: [
                    { email: user.email },
                    { password: user.password }
                ],
            },
        });
        // give a JWT access token to founduser as they passed security
        let jwt = jsonwebtoken_1.sign({
            user: {
                id: foundUser.id,
                email: foundUser.email
            }
        }, 
        // the password here is the signature.
        "shh", {
            issuer: "auth.ix.co.za",
            audience: 'ix.co.za'
        });
        // return the jwt which is the data and the password.
        return {
            token: jwt,
        };
    }
};
__decorate([
    rest_1.get("/verify"),
    __param(0, rest_1.param.query.string("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "verifyToken", null);
__decorate([
    rest_1.post("/login") // log in end point
    ,
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.Users]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginUser", null);
LoginController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map