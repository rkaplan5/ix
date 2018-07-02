import { DefaultCrudRepository } from "@loopback/repository";
import { Users } from "../models/users";
import { DataSource } from "loopback-datasource-juggler";
export declare class UserRepository extends DefaultCrudRepository<Users, typeof Users.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
