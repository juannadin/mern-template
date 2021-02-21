import { Config } from './types';

const config: Config = {
  server: {
    port: 8080,
    securePort: 8443,
    host: '0.0.0.0',
    static: './build',
    basePath: '/',
    bodyParser: {
      json: {
        limit: '100kb',
      },
      urlencoded: {
        limit: '100kb',
        extended: true,
      },
      raw: {
        limit: '100kb',
      },
    },
  },
};


export default config;
