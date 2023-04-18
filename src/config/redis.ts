import { createClient, RedisClientType } from 'redis';

export let redis: RedisClientType;
export async function connectRedis(): Promise<void> {
  redis = createClient({
    url: process.env.REDIS_URL,
  });
  await redis.connect();
  console.log('Connected to Redis.');
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}
