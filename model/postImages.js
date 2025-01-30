module.exports = (sequelize, DataTypes) => {
  const PostImages = sequelize.define('PostImages', {
    imageUrl: {
      type: DataTypes.STRING, // 이미지 경로 저장
      allowNull: false,
    },
  });

  // Post와 관계 설정 (다대일 관계)
  PostImages.associate = (models) => {
    PostImages.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
  };

  return PostImages;
};
