import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Post from "../models/post.js";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname } from "path";
import User from "../models/user.js";
import { format } from "date-fns";
import { where } from "sequelize";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

router.post("/", upload.array("img"), async (req, res, next) => {
  try {
    let urls;
    if (req.files) {
      urls = req.files.map((file) => `/img/${file.filename}`).join(",");
    } else {
      urls = "";
    }
    const { title, content, tag, userId } = req.body;
    const img = urls;
    await Post.create({
      title,
      content,
      tag,
      img,
      UserId: userId,
    });
    res.send("Success");
  } catch (error) {
    next(error);
  }
});
router.put("/:postId", upload.single("img"), async (req, res, next) => {
  const { postId } = req.params;
  try {
    let urls;
    if (req.files) {
      urls = req.files.map((file) => `/img/${file.filename}`).join(",");
    } else {
      urls = "";
    }
    const { title, content, tag } = req.body;
    const img = urls;
    await Post.update(
      {
        title: title,
        content: content,
        tag: tag,
        img: img,
      },
      {
        where: {
          id: postId,
        },
      }
    );
    res.send("Success");
  } catch (err) {
    next(err);
  }
});
router.delete("/:postId", async (req, res) => {
  await Post.destroy({
    where: {
      id: req.params.postId,
    },
  });
  res.send("Post deleted");
});
router.put("/likes/:postId", async (req, res) => {
  const { postId } = req.params;
  await Post.increment("likes", { by: 1, where: { id: postId } });
  const likeCount = await Post.findOne({
    where: { id: postId },
  });
  res.send(likeCount);
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
