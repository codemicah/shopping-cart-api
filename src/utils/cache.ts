import * as redis from "redis";
import { config } from "../config/env";

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD, REDIS_DB } =
  config;

export const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST as string,
    port: Number(REDIS_PORT),
  },
  password: REDIS_PASSWORD,
  username: REDIS_USERNAME,
  database: Number(REDIS_DB),
});

export const connectRedis = async () => await redisClient.connect();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.log("Error connecting to Redis: ", error);
});
export const cacheProductStock = (productId: string, stock: number): void => {
  redisClient.setEx(`product:${productId}:stock`, 3600, stock.toString()); // Cache stock for 1 hour
};

export const getCachedProductStock = async (productId: string) => {
  const data = await redisClient.get(`product:${productId}:stock`);

  if (data) {
    return parseInt(data, 10);
  }
  return null;
};

export default redisClient;
