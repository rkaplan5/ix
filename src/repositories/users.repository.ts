import { DefaultCrudRepository, juggler } from "@loopback/repository";
import { Users } from "../models/users";
import { inject } from "@loopback/core";

export class UserRepository extends DefaultCrudRepository<
    Users,
    typeof Users.prototype.id
    >
{
    constructor(
        @inject('datasources.db') protected datasource: juggler.DataSource
    ) {
        super(Users, datasource);
    }
}
