import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.js";

import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";

const router = express.Router();

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
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

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.send(`error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});
router.post("/logout", isLoggedIn, (req, res, next) => {
  console.log("logout");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    res.send("logout");
  });
});

export { router };
