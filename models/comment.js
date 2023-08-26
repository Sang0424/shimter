import { Sequelize } from "sequelize";
import User from "./user.js";
import Post from "./post.js";

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        comment: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        commenter: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate() {
    Comment.belongsTo(Post);
    Comment.belongsTo(User);
  }
}

export default Comment;
