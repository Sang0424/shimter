import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import { sequelize } from "./models/index.js";
import passportConfig from "./passport/index.js";
import cookieParser from "cookie-parser";

dotenv.config();
import cors from "cors";
import routes from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
passportConfig();
app.set("port", process.env.PORT || 8080);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/img", express.static(path.join(__dirname, "uploads")));
// app.use(
//   "/thumbnails",
//   express.static(path.join(__dirname, "uploads/thumbnails"))
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   next(error);
// });

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
//   res.status(err.status || 500);
//   res.render("error");
// });
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
