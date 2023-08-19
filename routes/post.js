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
// router.post("/img", upload.single("img"), async (req, res, next) => {
//   try {
//     const thumbnailPath = path.join(
//       __dirname,
//       `../uploads/thumbnails/thumbnail_${req.file.filename}`
//     );
//     sharp(req.file.path) // 압축할 이미지 경로
//       .resize({ width: 100, height: 90 })
//       .withMetadata() // 이미지의 exif데이터 유지
//       .toFile(thumbnailPath);
//   } catch (err) {
//     console.log(err);
//   }
//   res.json({
//     thumbnailUrl: `/thumbnails/thumbnail_${req.file.filename}`,
//   });
// });
// const upload2 = multer();

router.post("/", upload.single("img"), async (req, res, next) => {
  try {
    // const thumbnailPath = path.join(
    //   __dirname,
    //   `../uploads/thumbnails/thumbnail_${req.file.filename}`
    // );
    // sharp(req.file.path) // 압축할 이미지 경로
    //   .resize({ width: 100, height: 90 })
    //   .withMetadata() // 이미지의 exif데이터 유지
    //   .toFile(thumbnailPath);
    // const thumbnailUrl = `/thumbnails/thumbnail_${req.file.filename}`;
    //console.log(req.file);
    const url = `/img/${req.file.filename}`;
    const { title, content, tag } = req.body;
    //const { title, content, tag } = form;
    const img = url || null;
    //const thumbnail = thumbnailUrl || null;
    const userId = req.user.id;
    await Post.create({
      title,
      content,
      tag,
      img,
      //thumbnail,
      UserId: userId,
    });
    res.send("Success");
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
