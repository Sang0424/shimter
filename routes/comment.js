import express from "express";
import Comment from "../models/comment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Comment.create({
    comment: req.body.comment,
  });
  res.json(data);
});
