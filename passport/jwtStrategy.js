import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/user.js";

export default () => {
  dotenv.config();
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    )
  );
};
