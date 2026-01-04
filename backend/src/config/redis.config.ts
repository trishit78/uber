import redis from "redis";

const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.info("Connected to redis successfully");
});
redisClient.on("error", (error:unknown) => {
  console.error("Redis connection error", error);
});

redisClient.connect();

export default redisClient;
