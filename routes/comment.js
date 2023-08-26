import express from "express";
import Comment from "../models/comment.js";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.post("/", upload.none(), async (req, res) => {
  const { userId, postId, comment, commenter } = req.body;
  try {
    await Comment.create({
      comment: comment,
      commenter: commenter,
      PostId: postId,
      UserId: userId,
    });
    res.send("comments posted!");
  } catch (err) {
    console.log(err);
  }
});

// router.get("/:postId", async (req, res) => {
//   const comments = await Comment.findOne({ where: { id: req.params.postId } });
//   res.send(comments);
// });

export { router };
