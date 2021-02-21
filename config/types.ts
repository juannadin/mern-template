import { OptionsJson, Options, OptionsUrlencoded } from 'body-parser';

export type ServerConfig = {
  port: number,
  securePort: number,
  host: string,
  static: string,
  basePath: string,
  bodyParser: {
    json: OptionsJson,
    urlencoded: OptionsUrlencoded,
    raw: Options,
  },
}

export type Config = {
  server: ServerConfig,
}
