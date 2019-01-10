// @ts-ignore
import consola from 'consola';
import express from 'express';
// @ts-ignore
import { Builder, Nuxt } from 'nuxt';

export default class NuxtExpressServer {
  private app: express.Application;
  private host: string;
  private port: number;

  constructor() {
    this.app = express();
    this.host = process.env.HOST || '127.0.0.1';
    this.port = Number(process.env.PORT) || 3000;
  }

  public start(): void {
    // Import and Set Nuxt.js options
    const config = require('../../nuxt.config.js');
    config.dev = !(process.env.NODE_ENV === 'production');

    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt);
      builder.build();
    }

    // Give nuxt middleware to express
    this.app.use(nuxt.render);

    // Listen the server
    this.app.listen(this.port, this.host);
    consola.ready(`Server listening on http://${this.host}:${this.port}`);
  }
}

const server = new NuxtExpressServer();
server.start();
