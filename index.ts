import express from 'express';

import appRoute from './app/server/index';
import apiRoute from './api/index';

const app = express();
const {
  PORT = 3000,
} = process.env;

app.use(appRoute);
app.use('/api', apiRoute);
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
