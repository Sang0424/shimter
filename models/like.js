import { Sequelize } from "sequelize";
import User from "./user.js";
import Post from "./post.js";

class Like extends Sequelize.Model {
  static initiate(sequelize) {
    Like.init({
      like: {
        type: Sequelize.INTEGER(),
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
    });
    
  } 
  static associate() {
    Like.belongsTo(Post);
    Like.belongsTo(User);
  }
}
export default Like;