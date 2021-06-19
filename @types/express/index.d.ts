import { FunctionComponent } from 'react';

declare module 'express-serve-static-core' {
  export interface Response {
    reactRender: (c: FunctionComponent, p: any) => void
  }
}
