require('dotenv').config(); // 환경 변수 로드
const { Sequelize } = require('sequelize');

// PG 연결 설정
const sequelize = new Sequelize(
  process.env.PG_NAME,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: console.log, // SQL 쿼리를 콘솔에 출력
  }
);
(async () => {
  try {
    await sequelize.authenticate(); // PG 연결 테스트
    console.log('---------------------------------------------------------------');
    console.log('✅ Database connection has been established successfully.');
    console.log('---------------------------------------------------------------');
  } catch (error) {
    console.log('---------------------------------------------------------------');
    console.error('❌ Unable to connect to the database:', error.message);
    console.log('---------------------------------------------------------------');
  } finally {
    await sequelize.close(); // 연결 닫기
  }
})();
