"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const sequence_1 = require("./sequence");
/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
/* tslint:enable:no-unused-variable */
class IxApplication extends boot_1.BootMixin(repository_1.RepositoryMixin(rest_1.RestApplication)) {
    constructor(options) {
        super({
            rest: {
                port: process.env.PORT || 3000
            }
        });
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        // use below for an in-memory database
        let dataSourceConfig = new repository_1.juggler.DataSource({
            name: "db",
            connector: "memory"
            // connector: "loopback-connector-mysql", // find this in package.JSON
            // host: "127.0.0.1", //same as typing localhost
            // port: 3306,
            // database: 'project', // same name as Mysql parent of the table name
            // user: "root",
            // password: "" // same as on MYSQL
        });
        this.dataSource(dataSourceConfig);
    }
    async start() {
        await super.start();
        const server = await this.getServer(rest_1.RestServer);
        const port = await server.get(rest_1.RestBindings.PORT);
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Try http://127.0.0.1:${port}/ping`);
    }
}
exports.IxApplication = IxApplication;
//# sourceMappingURL=application.js.map