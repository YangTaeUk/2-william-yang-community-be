const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./model');

const authRoutes = require('./router/authRoutes');
const postRoutes = require('./router/postRoutes');
const commentRoutes = require('./router/commentRoutes');
require('./config/connectionTest');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware 설정
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // 정적 이미지 파일 제공
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// DB 동기화
db.sequelize.sync({ force: true }) // 필요 시 { force: true }로 초기화
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });
