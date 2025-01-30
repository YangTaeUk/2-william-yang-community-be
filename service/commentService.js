const { Comment, Post, KtbUser } = require('../models');

const createComment = async (postId, authorId, content) => {
  // ✅ 해당 게시글이 존재하는지 확인
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new Error('Post not found.');
  }

  // ✅ 댓글 생성
  return await Comment.create({ postId, authorId, content });
};

const getCommentsByPost = async (postId) => {
  return await Comment.findAll({
    where: { postId },
    include: [
      { model: KtbUser, as: 'author', attributes: ['id', 'username', 'email'] },
    ],
    order: [['createdAt', 'ASC']], // 최신 댓글이 아래로 가도록 정렬
  });
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    throw new Error('Comment not found.');
  }

  // ✅ 댓글 작성자만 삭제 가능
  if (comment.authorId !== userId) {
    throw new Error('You can only delete your own comment.');
  }

  await comment.destroy();
  return { message: 'Comment deleted successfully.' };
};

module.exports = { createComment, getCommentsByPost, deleteComment };
