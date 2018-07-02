import { model, property, Entity } from "@loopback/repository";

@model({
    name: "users"
})
export class Users extends Entity {

    @property({
        type: "number",
        id: true
    })
    userId: number;

    @property({
        type: "string"
    })
    username: string;

    @property({
        type: "string"
    })
    password: string;

    @property({
        type: "string"
    })
    email: string;

    @property({
        type: "string"
    })
    PaymentAddress: string;

    @property({
        type: "string"
    })
    phoneNumber: string;


}