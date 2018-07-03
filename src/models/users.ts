import { model, property, Entity } from "@loopback/repository";

@model({
    name: "cpt-user"//name of table on MySQL
})
export class Users extends Entity {

    @property({
        type: "number",
        id: true
    })
    id: number; // names in blue need to match the column names on MySQL

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

    getId() {
        return this.id;
    }
}
