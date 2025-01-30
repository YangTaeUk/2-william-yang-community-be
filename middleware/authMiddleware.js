const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // 사용자 정보 추가
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
