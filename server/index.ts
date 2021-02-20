import fs from 'fs';
import http from 'http';
import https from 'https';
import cluster from 'cluster';
import os from 'os';
import { normalize } from 'path';

import config from 'config';
import express, {
  Request, Response, Router, Express,
} from 'express';

import env from './env';
import middlewares from './middlewares';

const numCPUs = os.cpus().length;

type ServerConstructor = {
  apiRouter: Router,
  appRouter: Router,
}

/**
 * Server Class
 */
class Server {
  config: any;

  app: Express;

  server: any;

  constructor({ apiRouter, appRouter }: ServerConstructor) {
    this.config = config.get('server');

    this.app = express();

    /**
     * Set express trust proxy
     */
    this.app.set('trust proxy', true);

    /**
     * Ping route
     */
    this.app.get('/ping', (req: Request, res: Response) => res.status(200).send('pong'));

    /**
     * API routes
     */
    if (apiRouter) {
      const apiRoute = normalize(`${this.config.basePath}/api`);

      this.app.use(
        apiRoute,
        middlewares.api.before,
        apiRouter,
        middlewares.api.after,
      );
    }

    /**
     * App Routes
     */
    if (appRouter) {
      /**
       * Static middleware
       */
      if (!env.PRODUCTION) {
        this.app.use(express.static(this.config.static));
      }

      this.app.use(
        this.config.basePath,
        middlewares.app.before,
        appRouter,
        middlewares.app.after,
      );
    }

    /**
     * Run Server
     */
    if (env.PRODUCTION) {
      this.cluster();
    } else {
      this.startDev();
    }
  }

  /**
   * Start server
   */
  start(): Server {
    const { port, host } = this.config.server;
    this.server = http.createServer(this.app).listen(port, host, () => {
      console.log(`App listening on port ${port}.`);
    });
    return this;
  }

  /**
   * Start dev server
   */
  startDev(): Server {
    let port: number;

    // Creates https server
    if (env.SECURE) {
      port = this.config.securePort;
      const options = {
        key: fs.readFileSync(`${__dirname}/../config/ssl/key.pem`),
        cert: fs.readFileSync(`${__dirname}/../config/ssl/cert.pem`),
      };
      this.server = https.createServer(options, this.app);

    // Creates http server
    } else {
      port = this.config.port; // eslint-disable-line prefer-destructuring
      this.server = http.createServer(this.app);
    }

    // Configure server port and host
    this.server.listen(port, this.config.host, () => {
      console.log(`App listening on port ${port}.`);
    });

    return this;
  }

  /**
   * Stop server
   */
  stop() {
    this.server.close();
    return this;
  }

  /**
   * Use cluster to start server
   */
  cluster() {
    if (cluster.isMaster && env.DISABLE_NODEJS_CLUSTER !== 'true') {
      for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
      }

      cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
      });

      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Starting a new worker');
        cluster.fork();
      });
    } else {
      this.start();
    }
    return this;
  }
}

/**
 * Expose Ragnar
 */
export default Server;
