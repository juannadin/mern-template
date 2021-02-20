/**
 * Environment variables
 */
const variables = process.env;

type Env = {
  [key: string]: string | boolean | undefined
}

const env: Env = {
  ...variables,
  PRODUCTION: variables.NODE_ENV === 'production',
  DEVELOPMENT: variables.NODE_ENV === 'development',
  TEST: variables.NODE_ENV === 'test',
  SECURE: variables.NODE_ENV !== 'production' && variables.NODE_HTTPS === 'true',
};

/**
 * Expose env
 */
export default env;
