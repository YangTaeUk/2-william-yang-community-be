const { KtbUser } = require('../models');

const getAllKtbUsers = async () => {
  return await KtbUser.findAll();
};

const getKtbUserById = async (id) => {
  return await KtbUser.findByPk(id);
};

const createKtbUser = async (userData) => {
  return await KtbUser.create(userData);
};

const updateKtbUser = async (id, updateData) => {
  const user = await KtbUser.findByPk(id);
  if (!user) throw new Error('KtbUser not found');
  return await user.update(updateData);
};

const deleteKtbUser = async (id) => {
  const user = await KtbUser.findByPk(id);
  if (!user) throw new Error('KtbUser not found');
  await user.destroy();
};

module.exports = {
  getAllKtbUsers,
  getKtbUserById,
  createKtbUser,
  updateKtbUser,
  deleteKtbUser,
};
