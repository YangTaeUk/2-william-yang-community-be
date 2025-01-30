const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService');
const authChecker = require('../middleware/authChecker'); // ✅ 로그인 필요

// ✅ 댓글 작성
router.post('/:postId', authChecker, async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID. It must be an integer.' });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Comment content is required.' });
    }

    const comment = await commentService.createComment(postId, req.user.id, content);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 특정 게시글의 댓글 조회
router.get('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID. It must be an integer.' });
    }

    const comments = await commentService.getCommentsByPost(postId);
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 댓글 삭제
router.delete('/:commentId', authChecker, async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId, 10);
    if (isNaN(commentId)) {
      return res.status(400).json({ error: 'Invalid comment ID. It must be an integer.' });
    }

    const result = await commentService.deleteComment(commentId, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
