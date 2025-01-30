module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
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
        model: 'KtbUsers', // ✅ `KtbUsers` 테이블과 연결
        key: 'id'
      }
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.KtbUser, { foreignKey: 'authorId', as: 'author' });
    Post.hasMany(models.PostImages, { foreignKey: 'postId', as: 'images', onDelete: 'CASCADE' });
  };

  return Post;
};
