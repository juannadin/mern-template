import {
  Request, Response, RequestHandler, NextFunction,
} from 'express';
import React, { FunctionComponent } from 'react';
import ReactDOMServer from 'react-dom/server';

import Layout from '../../app/components/Layout';

const render: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.reactRender = (Component: FunctionComponent, props: any): void => {
    const LayoutElement = React.createElement(Layout);
    const App = React.createElement(Component, props);
    const html = ReactDOMServer.renderToStaticMarkup(LayoutElement);
    const app = ReactDOMServer.renderToString(App);
    const processedHTML = html.replace('{{children}}', app);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.send(processedHTML);
  };

  return next();
};

export default render;
