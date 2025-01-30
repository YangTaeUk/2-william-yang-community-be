'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // ✅ Comment → Post (게시글과의 관계)
      Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post', onDelete: 'CASCADE' });

      // ✅ Comment → KtbUser (작성자 관계)
      Comment.belongsTo(models.KtbUser, { foreignKey: 'authorId', as: 'author', onDelete: 'CASCADE' });
    }
  }

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'id',
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'KtbUsers',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );

  return Comment;
};
