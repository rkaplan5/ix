import { UserRepository } from "../repositories/users.repository";
import { PaymentRequest } from "../models/payment";
export declare class PaymentController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    makePayment(jwt: string, paymentRequest: PaymentRequest): Promise<any>;
}
