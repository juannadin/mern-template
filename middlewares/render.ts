import {
  Request, Response, RequestHandler, NextFunction, Send,
} from 'express';
import React, { FunctionComponent } from 'react';
import ReactDOMServer from 'react-dom/server';

const render: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.reactRender = (Component: FunctionComponent, props: any): void => {
    const LayoutWithProps = React.createElement(Component, props);
    const html = ReactDOMServer.renderToStaticMarkup(LayoutWithProps);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };

  return next();
};

export default render;
