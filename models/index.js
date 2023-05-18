import Sequelize from "sequelize";
import configObj from "../config/config.json" assert { type: "json" };
import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";

const env = process.env.NODE_ENV || "development";
const config = configObj[env];

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);
Post.initiate(sequelize);
Comment.initiate(sequelize);

User.associate();
Post.associate();
Comment.associate();
