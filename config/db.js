
require('dotenv').config();
const { Pool } = require("pg")

const pool = new Pool({
  name: process.env.PG_NAME,
  user: process.env.PG_USER, // PostgreSQL 사용자명
  host: process.env.PG_HOST, // PostgreSQL 서버 주소
  database: process.env.PG_DATABASE, // 사용할 데이터베이스 이름
  password: process.env.PG_PASSWORD, // 비밀번호
  port: process.env.PG_PORT, // PostgreSQL 기본 포트
  max: 10, // 최대 커넥션 수
  idleTimeoutMillis: 30000, // 커넥션 비활성 시간 (밀리초)
  connectionTimeoutMillis: 2000, // 연결 대기 시간 (밀리초)
});

// 쿼리 실행 함수 래핑
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release(); // 커넥션 반환
  }
};

module.exports = { query };
