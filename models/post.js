'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ✅ Post → KtbUser (작성자 관계)
      Post.belongsTo(models.KtbUser, { foreignKey: 'authorId', as: 'author' });

      // ✅ Post → PostImages (게시글은 여러 개의 이미지를 가질 수 있음)
      Post.hasMany(models.PostImages, { foreignKey: 'postId', as: 'images', onDelete: 'CASCADE' });

      // ✅ Post → Comment (게시글은 여러 개의 댓글을 가질 수 있음)
      Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
    }
  }
  Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'KtbUsers',
          key: 'id',
        },
      },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
