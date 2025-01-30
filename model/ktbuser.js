
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const KtbUser = sequelize.define('KtbUser', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        is: /^[0-9]+$/, // 숫자만 허용
      },
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING,
    },
    additional_info: {
      type: DataTypes.JSON,
    },
  });
  // 비밀번호 해싱 처리
  KtbUser.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return KtbUser;
};
