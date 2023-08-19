import express from "express";
import Comment from "../models/comment.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userId = req.user.id;
  const postId = req.body.url.split("/")[4];
  await Comment.create({
    comment: req.body.comment,
    PostId: postId,
    UserId: userId,
  });
});

export { router };
