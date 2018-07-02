import { Entity } from "@loopback/repository";
export declare class Users extends Entity {
    userId: number;
    username: string;
    password: string;
    email: string;
    PaymentAddress: string;
    phoneNumber: string;
}
