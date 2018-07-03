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
// import {inject} from '@loopback/context';
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async LogIn(user) {
        // Check that email and password are both supplied
        if (!user.email || !user.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email and password are valid
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email },
                { password: user.password },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        return await this.userRepo.findOne({
            where: {
                and: [
                    { email: user.email },
                    { password: user.password }
                ],
            },
        });
    }
};
__decorate([
    rest_1.post("/login"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.Users]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "LogIn", null);
LoginController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], LoginController);
exports.LoginController = LoginController;
// }
// @param.query.string("email") email: string
//  ): Promise<Array<Users>> {
//
//    return await this.userRepo.find({
//      where: {
//        email
//      }
//    })
//  }
// }
//# sourceMappingURL=login.controller.js.map