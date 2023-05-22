import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/index.js";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
        },
        {
          model: Comment,
        },
      ],
    });
    function formatDate(date) {
      const d = new Date(date);
      const now = Date.now();
      const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
      if (diff < 60 * 1) {
        // 1분 미만일땐 방금 전 표기
        return "방금 전";
      }
      if (diff < 60 * 60 * 24 * 3) {
        // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
        return formatDistanceToNow(d, { addSuffix: true, locale: ko });
      }
      return format(d, "PPP EEE p", { locale: ko }); // 날짜 포맷
    }
    const formatted = posts.map((post) => {
      const formatPost = { ...post.dataValues };
      formatPost.createdAt = formatDate(post.createdAt);
      formatPost.commentCount = post.Comments.length;
      return formatPost;
    });
    res.render("index", { formatted });
  } catch (err) {
    next(err);
  }
});

router.get("/detail/:postId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{ model: User, attributes: ["id", "nick"] }],
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다");
    }
    function formatDate(date) {
      const d = new Date(date);
      const now = Date.now();
      const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
      if (diff < 60 * 1) {
        // 1분 미만일땐 방금 전 표기
        return "방금 전";
      }
      if (diff < 60 * 60 * 24 * 3) {
        // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
        return formatDistanceToNow(d, { addSuffix: true, locale: ko });
      }
      return format(d, "PPP EEE p", { locale: ko }); // 날짜 포맷
    }
    const formatted = {
      ...post.dataValues,
      createdAt: formatDate(post.createdAt),
    };
    const comments = await Comment.findAll({
      where: { PostId: req.params.postId },
    });
    comments.forEach((comment) => {
      comment.dataValues.createdAt = formatDate(comment.dataValues.createdAt);
    });
    const amount = await Comment.count({
      where: { PostId: req.params.postId },
    });
    res.render("detail", { formatted, comments, amount });
  } catch (err) {
    next(err);
  }
});

router.get("/post", isLoggedIn, async (req, res, next) => {
  res.render("post");
});

router.get("/profile", isLoggedIn, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      where: {
        UserId: req.user.id,
      },
    });
    res.render("profile", { posts });
  } catch (err) {
    next(err);
  }
});

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("signup");
});

export { router };
