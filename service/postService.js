const { Post, KtbUser, PostImages, Comment } = require('../models');

// 게시글 생성 (복수 이미지 포함)
const createPost = async (userId, { title, content }, files) => {
  const post = await Post.create({ title, content, authorId: userId });

  if (files && files.length > 0) {
    const images = files.map(file => ({ imageUrl: `/uploads/${file.filename}`, postId: post.id }));
    await PostImages.bulkCreate(images);
  }

  return post;
};

// 모든 게시글 조회 (이미지 포함)
const getAllPosts = async () => {
  return await Post.findAll({
    include: [
      { model: KtbUser, as: 'author', attributes: ['id', 'username', 'email'] },
      { model: PostImages, as: 'images', attributes: ['id', 'imageUrl'] },
    ],
    order: [['createdAt', 'DESC']],
  });
};

// 특정 게시글 조회
const getPostById = async (postId) => {
  // ✅ postId가 정수인지 확인
  if (isNaN(postId)) {
    throw new Error('Invalid postId. It must be an integer.');
  }

  return await Post.findByPk(postId, {
    include: [
      { model: KtbUser, as: 'author', attributes: ['id', 'username', 'email'] },
      { model: PostImages, as: 'images', attributes: ['id', 'imageUrl'], required: false },
    ],
  });
};

const getPaginatedPosts = async (page = 1) => {
  const limit = 5;
  const offset = (page - 1) * limit;

  const { rows: posts, count } = await Post.findAndCountAll({
    include: [
      {
        model: KtbUser,
        as: 'author',
        attributes: ['id', 'username', 'email'],
      },
      {
        model: PostImages,
        as: 'images',
        attributes: ['id', 'imageUrl'],
        required: false, //PostImages가 없을 때도 오류 없이 빈 배열로 반환
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'content', 'authorId', 'createdAt'],
        include: [
          { model: KtbUser, as: 'author', attributes: ['id', 'username', 'email'] }
        ],
        required: false, // 댓글이 없어도 게시글을 반환해야 함
      },
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  return {
    posts,
    totalPosts: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

module.exports = { createPost, getPaginatedPosts, getAllPosts, getPostById };
