var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', async function (req, res, next) {
  try {
    const user = await User.find({ token: req.query.token });
    let contacts = [];
    for (const contactEmail in user[0].chats) {
      contacts.push(contactEmail);
    }
    res.json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
