import { Sequelize } from "sequelize";
import User from "./user.js";
import Comment from "./comment.js";
//import Like from './like.js'

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(140),
          allowNull: true,
        },
        tag: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        //thumbnail: {
        //type: Sequelize.STRING(),
        //allowNull: true,
        //},
        likes: {
          type: Sequelize.INTEGER(),
          allowNull: true,
          defaultValue: 0,
        },
        dislikes: {
          type: Sequelize.INTEGER(),
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate() {
    Post.hasMany(Comment);
    //Post.hasMany(Like);
    Post.belongsTo(User);
  }
}

export default Post;
