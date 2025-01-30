const express = require('express');
const router = express.Router();
const postService = require('../service/postService');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// 게시글 작성 (복수 이미지 지원)
router.post('/', authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const postData = { title: req.body.title, content: req.body.content };
    const post = await postService.createPost(req.user.id, postData, req.files);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5개씩 게시글 페이징 조회 (피드 형태)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // 기본 페이지는 1
    const result = await postService.getPaginatedPosts(page);
    console.log(result)
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 특정 게시글 조회
router.get('/:id', async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

module.exports = router;
