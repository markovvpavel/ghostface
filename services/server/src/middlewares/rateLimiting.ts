import { NextFunction, Request, Response } from "express";
import redisClient from "@/core/redis";

const RATE_LIMIT = 5;

export const rateLimiting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip;
  const key = `rate-limit:${ip}`;

  const requests = await redisClient.incr(key);

  if (requests === 1) await redisClient.expire(key, 60);

  if (requests > RATE_LIMIT) {
    res.status(429).send({ message: "Too many requests" });
    return;
  }

  next();
};
