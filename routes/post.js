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
router.post("/", upload.single("img"), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let img;
    if (req.file) {
      img = `/img/${req.file.filename}`;
    } else {
      img = null;
    }

    // function getTimeDiffString(postCreatedAt) {
    //   const diff = new Date() - postCreatedAt;
    //   const minute = 60 * 1000;
    //   const hour = 60 * minute;
    //   const day = 24 * hour;

    //   if (diff < minute) {
    //     return "방금 전";
    //   } else if (diff < hour) {
    //     return `${Math.floor(diff / minute)}분 전`;
    //   } else if (diff < day) {
    //     return `${Math.floor(diff / hour)}시간 전`;
    //   } else {
    //     return `${Math.floor(diff / day)}일 전`;
    //   }
    // }
    // const createdAt = getTimeDiffString();
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

export { router };
