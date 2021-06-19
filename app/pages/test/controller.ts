import { RequestHandler, Request, Response } from 'express';

import View from './components/View';

const render: RequestHandler = (req: Request, res: Response) => {
  res.reactRender(View, {
    title: 'que tul',
  });
};

export default render;
