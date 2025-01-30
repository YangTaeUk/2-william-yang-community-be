const { KtbUser } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 사용자 등록
const registerUser = async ({ email, username, password, first_name, last_name }) => {
  const existingUser = await KtbUser.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  // 비밀번호 해싱 (회원가입 API에서만 해싱)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await KtbUser.create({
    email,
    username,
    password: hashedPassword, // 해싱된 비밀번호 저장
    first_name,
    last_name
  });

  return { message: 'User registered successfully', user: newUser };
};

// 로그인
const loginUser = async (email, password) => {
  const user = await KtbUser.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  // JWT 토큰 생성
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { message: 'Login successful', token };
};

const getUserById = async (userId) => {
  return await KtbUser.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
  });
};

const updateUser = async (userId, updateData) => {
  // ✅ 수정할 사용자 정보 가져오기
  const user = await KtbUser.findByPk(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  // ✅ 비밀번호 변경 시 해싱 처리
  if (updateData.password) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);
    updateData.password = hashedPassword;
  }

  // ✅ 사용자 정보 업데이트
  await user.update(updateData);

  // ✅ 업데이트된 정보 반환 (비밀번호 제외)
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    updatedAt: user.updatedAt,
  };
};

module.exports = { registerUser, loginUser, getUserById, updateUser };
