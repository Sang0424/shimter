import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Post from "../models/post.js";
import User from "../models/user.js";
import { format } from "date-fns";

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/img", upload.single("img"), async (req, res, next) => {
  res.json({ url: `/img/${req.file.filename}` });
});
router.post("/", upload.single("img"), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let img;
    if (req.file) {
      img = `/img/${req.file.filename}`;
    } else {
      img = null;
    }
    const post = await Post.create({
      title,
      content,
      img,
      UserId: req.user.id,
    });
    const postId = post.id;
    res.redirect(`/detail/${postId}`);
  } catch (error) {
    next(error);
  }
});
router.put("/likes", async (req, res) => {
  const { postId } = req.body;
  await Post.increment("likes", { by: 1, where: { id: postId } });
  const likeCount = await Post.findOne({
    where: { id: postId },
  });
  res.json({ likeCount: likeCount });
});
router.put("/dislikes", async (req, res) => {
  const { postId } = req.body;
  await Post.increment("dislikes", {
    by: 1,
    where: { id: postId },
  });
  const dislikeCount = await Post.findOne({
    where: { id: postId },
  });
  res.json({ dislikeCount: dislikeCount });
});
export { router };
