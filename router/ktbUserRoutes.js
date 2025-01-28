const express = require('express');
const router = express.Router();
const ktbUserService = require('../service/ktbUserService');

router.get('/', async (req, res) => {
  const users = await ktbUserService.getAllKtbUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await ktbUserService.getKtbUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'KtbUser not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  const userData = req.body;
  const newUser = await ktbUserService.createKtbUser(userData);
  res.status(201).json(newUser);
});

router.put('/:id', async (req, res) => {
  const updatedUser = await ktbUserService.updateKtbUser(req.params.id, req.body);
  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  await ktbUserService.deleteKtbUser(req.params.id);
  res.json({ message: 'KtbUser deleted successfully' });
});

module.exports = router;
