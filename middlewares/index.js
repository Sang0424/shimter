import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import { verifyAccessToken } from "../passport/jwt-utils.js";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  if (
    !req.headers["authorization"] ||
    !req.headers["authorization"].startsWith("Bearer")
  ) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
  const token = req.headers["authorization"].substring(7);
  const user = verifyAccessToken(token);
  req.user = user;
  next();
};

export const isNotLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user.id < 1) {
      next();
    } else {
      res.status(403).send("이미 로그인하였습니다");
    }
  });
};
