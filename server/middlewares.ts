import { RequestHandler } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import render from '../middlewares/render';

import { ServerConfig } from '../config/types';

export type Middlewares = {
  app: {
    before: Array<RequestHandler>,
    after: Array<RequestHandler>,
  },
  api: {
    before: Array<RequestHandler>,
    after: Array<RequestHandler>,
  }
}

type MiddlewaresFunc = (config: ServerConfig) => Middlewares;

const sharedMiddlewares = (config: ServerConfig) => ([
  compression(),
  helmet({
    frameguard: false,
    dnsPrefetchControl: {
      allow: true,
    },
  }),
  bodyParser.urlencoded(config.bodyParser.urlencoded),
  bodyParser.json(config.bodyParser.json),
  bodyParser.raw(config.bodyParser.raw),
  cookieParser(),
  hpp(),
]);

const middlewares: MiddlewaresFunc = (config: ServerConfig) => ({
  app: {
    before: [
      ...sharedMiddlewares(config),
      render,
    ],
    after: [],
  },
  api: {
    before: [
      ...sharedMiddlewares(config),
    ],
    after: [],
  },
});

export default middlewares;
