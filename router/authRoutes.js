const express = require('express');
const router = express.Router();
const authService = require('../service/authService');
const authChecker = require('../middleware/authChecker'); // ✅ 로그인 여부 확인

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// ✅ 토큰을 이용한 사용자 정보 조회 (로그인 필수)
router.get('/me', authChecker, async (req, res) => {
  try {
    // ✅ `authChecker` 미들웨어를 통해 `req.user`에 로그인한 사용자 정보 저장됨
    const user = await authService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 사용자 정보 조회 (로그인 필수)
router.get('/users/:id', authChecker, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID. It must be an integer.' });
    }

    // ✅ 본인 정보만 조회 가능
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'You can only view your own account.' });
    }

    const user = await authService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 계정 정보 수정 (로그인 필수)
router.patch('/users/:id', authChecker, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    // ✅ userId가 숫자가 아닌 경우, 400 Bad Request 반환
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID. It must be an integer.' });
    }

    // ✅ 로그인한 사용자만 자신의 계정 정보 수정 가능
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'You can only update your own account.' });
    }

    // ✅ 업데이트할 데이터가 있는지 확인
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No update data provided.' });
    }

    const updatedUser = await authService.updateUser(userId, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
