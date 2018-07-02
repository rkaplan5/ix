import {IxApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {IxApplication};

export async function main(options?: ApplicationConfig) {
  const app = new IxApplication(options);
  await app.boot();
  await app.start();
  return app;
}
