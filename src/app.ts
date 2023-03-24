import { connectPrismaDb, connectRedis, disconnectPrismaDB, disconnectRedis, loadEnv } from '@/config';
import cors from 'cors';

import express, { Express } from 'express';
import 'express-async-errors';
loadEnv();

import { handleApplicationErrors } from '@/middlewares';

const app = express();

app.use(cors()).use(express.json()).use(handleApplicationErrors);

export async function init(): Promise<Express> {
  connectPrismaDb();
  await connectRedis();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectPrismaDB();
  await disconnectRedis();
}

export default app;
