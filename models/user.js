import { Sequelize } from "sequelize";
import Post from "./post.js";
import Comment from "./comment.js";
//import Like from "./like.js";

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        name: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    User.hasMany(Post);
    User.hasMany(Comment);
    //User.hasMany(Like);
  }
}

export default User;
