import Server from './server';

import appRouter from './app/routes/index';
import apiRouter from './api/index';

export default new Server({
  apiRouter,
  appRouter,
});
