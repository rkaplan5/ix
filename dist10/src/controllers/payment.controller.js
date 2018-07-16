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
// import { ProductRepository } from "../repositories/product.repository";
const users_repository_1 = require("../repositories/users.repository");
//import { MenuRepository } from "../repositories/menu.repository";
//import { TransactionRepository } from "../repositories/transaction.repository";
const rest_1 = require("@loopback/rest");
// import { Menu } from "../models/menu";
const payment_1 = require("../models/payment");
const jsonwebtoken_1 = require("jsonwebtoken");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let PaymentController = class PaymentController {
    constructor(
    // @repository(TransactionRepository.name) protected transactionRepo: TransactionRepository,
    userRepo) {
        this.userRepo = userRepo;
    }
    async makePayment(jwt, paymentRequest) {
        let Users = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            Users = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        // Use the product ID in the product repo to find the price
        let stripe = require("stripe")("sk_test_EQDLuomZNsQDmMkuzjgqrNSs");
        try {
            const charge = await stripe.charges.create({
                source: paymentRequest.stripeToken,
                currency: "usd",
                amount: 100
            });
            // Create a Transaction in your Transaction Repo
            // Return the transaction
            return charge;
        }
        catch (e) {
            console.log(e);
            throw new rest_1.HttpErrors.BadRequest("Charge failed");
        }
    }
};
__decorate([
    rest_1.post('/payments'),
    __param(0, rest_1.param.query.string("jwt")),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_1.PaymentRequest]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "makePayment", null);
PaymentController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map