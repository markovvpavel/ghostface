import { redisConfig } from "@/config/redis";
import Redis from "ioredis";

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(redisConfig);

      RedisClient.instance.on("connect", () =>
        console.log("Connected to Redis")
      );
      RedisClient.instance.on("error", (err) =>
        console.error("Redis error:", err)
      );
    }
    return RedisClient.instance;
  }
}

export default RedisClient.getInstance();
