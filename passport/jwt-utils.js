import { promisify } from "util";
import jwt from "jsonwebtoken";
import redisClient from "../redis/index.js";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (userWithoutPwd) => {
  return jwt.sign({ ...userWithoutPwd }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

export const verifyAccessToken = (token) => {
  if (!token) {
    return false;
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.exp > new Date().getTime() / 1000) return decoded;
  } catch (err) {
    return false;
  }
};

export const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  redisClient.set(String(userId), refreshToken);
  return refreshToken;
};

export const verifyRefreshToken = async (token) => {
  // const getAsync = promisify(redisClient.get).bind(redisClient);
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const data = await redisClient.get(String(userId));
    if (token === data) {
      return { userId, isReissue: true };
    } else {
      return { userId: null, isReissue: false };
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
