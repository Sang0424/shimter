import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";
import { verifyToken, isNotLoggedIn } from "../middlewares/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../passport/jwt-utils.js";
import redisClient from "../redis/index.js";

const router = express.Router();
dotenv.config();

router.post("/signup", async (req, res, next) => {
  const { email, name, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.send("already exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      nick,
      password: hash,
    });
    return res.send("success");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (authError, user, info) => {
      if (authError || !user) {
        return res.status(400).json({
          message: info,
        });
      }
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          res.send(loginError);
          return;
        }
        const userWithoutPwd = user.dataValues;
        delete userWithoutPwd.password;
        const accessToken = generateAccessToken(userWithoutPwd);
        const refreshToken = generateRefreshToken(userWithoutPwd.id);
        return res
          .status(200)
          .json({ userWithoutPwd, accessToken, refreshToken });
      });
    }
  )(req, res, next);
});
router.get("/reissue", async (req, res, next) => {
  try {
    if (
      !req.headers["authorization"] ||
      !req.headers["authorization"].startsWith("Bearer")
    ) {
      return res.status(403).send("유효하지 않습니다");
    }
    const token = req.headers["authorization"].substring(7);
    const { userId, isReissue } = await verifyRefreshToken(token);
    //console.log(isReissue);
    if (isReissue) {
      const user = await User.findOne({ where: { id: userId } });
      const userWithoutPwd = user.dataValues;
      delete userWithoutPwd.password;
      const newAccessToken = generateAccessToken(userWithoutPwd);
      const newRefreshToken = generateRefreshToken(userId);
      return res.status(200).json({ newAccessToken, newRefreshToken });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/logout", verifyToken, (req, res, next) => {
  try {
    const userId = req.user.id;
    redisClient.del(String(userId));
  } catch (err) {
    console.log(err);
  }
});

export { router };
