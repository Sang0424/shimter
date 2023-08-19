import { Router } from "express";
import { router as postRouter } from "./post.js";
import { router as pageRouter } from "./page.js";
import { router as authRouter } from "./auth.js";
import { router as commentRouter } from "./comment.js";

const routes = Router();

routes.use("/post", postRouter);
routes.use("/", pageRouter);
routes.use("/auth", authRouter);
routes.use("/comment", commentRouter);

export default routes;
