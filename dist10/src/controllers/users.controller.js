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
const repository_1 = require("@loopback/repository");
const users_repository_1 = require("../repositories/users.repository");
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
let bcrypt = require('bcrypt'); // old style
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let UserController = class UserController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    // anything with a backslash is the endpoint for URL
    // if the findusers has a JWT token then send the user data
    async findUsers(jwt) {
        try {
            let payload = jsonwebtoken_1.verify(jwt, "shh");
            return await this.userRepo.find(); //return the .db
        }
        catch (err) { //if JWT token does exist, return the error
            throw new rest_1.HttpErrors.Unauthorized("invalid token");
        }
    }
    async findUsersById(id) {
        // Check for valid ID
        let userExists = !!(await this.userRepo.count({ id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }
        return await this.userRepo.findById(id);
    }
};
__decorate([
    rest_1.get('/users')
    // if the findusers has a JWT token then send the user data
    ,
    __param(0, rest_1.param.query.string("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
__decorate([
    rest_1.get('/users/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsersById", null);
UserController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UserRepository)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map