import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer, RestBindings } from '@loopback/rest';
import { MySequence } from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';
import { Class, Repository, juggler, RepositoryMixin } from '@loopback/repository';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';
/* tslint:enable:no-unused-variable */

export class IxApplication extends BootMixin(
  RepositoryMixin(RestApplication))
{
  constructor(options?: ApplicationConfig) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

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
    //

    let dataSourceConfig = new juggler.DataSource({
      name: "db",
      connector: "loopback-connector-mysql", // find this in package.JSON
      host: "127.0.0.1", //same as typing localhost
      port: 3306,
      database: 'project', // same name as Mysql parent of the table name
      user: "root",
      password: "" // same as on MYSQL
    });
    this.dataSource(dataSourceConfig);
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get(RestBindings.PORT);
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
  }
}
