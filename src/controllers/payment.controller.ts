// Uncomment these imports to begin using these cool features!
import { inject } from '@loopback/context';
import { repository } from "@loopback/repository";
// import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/users.repository";
//import { MenuRepository } from "../repositories/menu.repository";
//import { TransactionRepository } from "../repositories/transaction.repository";

import { post, requestBody, param, HttpErrors } from "@loopback/rest";

import { Transaction } from "../models/transaction";
import { Users } from "../models/users"
// import { Menu } from "../models/menu";
import { PaymentRequest } from "../models/payment";
import { Product } from "../models/products";
import { verify } from "jsonwebtoken";

// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';

export class PaymentController {

  constructor(
    // @repository(TransactionRepository.name) protected transactionRepo: TransactionRepository,
    @repository(UserRepository.name) protected userRepo: UserRepository,
    // @repository(MenuRepository.name) protected menuRepo: MenuRepository,
    // @repository(ProductRepository.name) protected productRepo: ProductRepository
  ) { }

  @post('/payments')
  async makePayment(
    @param.query.string("jwt") jwt: string,
    @requestBody() paymentRequest: PaymentRequest
  ) {

    let Users = null;
    try {
      let payload = verify(jwt, 'shh') as any;
      Users = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
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
    } catch (e) {
      console.log(e);
      throw new HttpErrors.BadRequest("Charge failed");
    }

  }

  // retrieve a charge (get method)
}
