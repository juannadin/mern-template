import { RequestHandler } from 'express';

type Middlewares = {
  app: {
    before: Array<RequestHandler>,
    after: Array<RequestHandler>,
  },
  api: {
    before: Array<RequestHandler>,
    after: Array<RequestHandler>,
  }
}

const middlewares: Middlewares = {
  app: {
    before: [],
    after: [],
  },
  api: {
    before: [],
    after: [],
  },
};

export default middlewares;
