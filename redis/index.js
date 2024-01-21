import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = redis.createClient(process.env.REDIS_PORT);

redisClient.connect();
redisClient.on("ready", () => {
  console.log("ready");
});
redisClient.on("error", (error) => {
  console.error(error);
});

export default redisClient;
