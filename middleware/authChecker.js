const jwt = require('jsonwebtoken');
const { KtbUser } = require('../models');

const authChecker = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await KtbUser.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. User not found.' });
    }

    req.user = user; // ✅ 요청 객체에 사용자 정보 추가
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
  }
};

module.exports = authChecker;
