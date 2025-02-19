import { RedisOptions } from "ioredis";

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  throw new Error("Missing required Redis environment variables");
}

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
} as RedisOptions;
