import env from 'dotenv';

env.config();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DOCKER_PORT,
  MONGODB_DATABASE,
  NODE_ENV,
  NODE_LOCAL_PORT,
  JWT_TOKEN_EXP,
  JWT_SECRET,
  CLIENT_BASE_URL,
  API_BASE_URL,
} = process.env;


export default {
  env: NODE_ENV ?? 'dev',
  port: NODE_LOCAL_PORT,
  apiBaseUrl: API_BASE_URL,
  tokenExp: JWT_TOKEN_EXP ?? '1h',
  jwtSecret: JWT_SECRET || 'secret',
  clientBaseUrl: CLIENT_BASE_URL ?? '',
  databaseUrl: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`,
};
