import { DefaultCrudRepository } from "@loopback/repository";
import { Users } from "../models/users";
import { DataSource } from "loopback-datasource-juggler";
import { inject } from "@loopback/core";

export class UserRepository extends DefaultCrudRepository<
    Users,
    typeof Users.prototype.id
    >

{

    constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Users, datasource);
}
}