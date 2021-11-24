var express = require('express');
var router = express.Router();
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'secret';
const bcrypt = require('bcrypt');

router.post('/auth', async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).json({ err: 'Invalid email or password' });
    }

    if (!user.verify(req.body.password)) {
      return res.status(500).json({ err: 'Invalid email or password' });
    }

    if (!user.token) {
      const accessToken = jwt.sign({ email: user.email }, accessTokenSecret);
      const filter = { email: req.body.email };
      const update = { token: accessToken };

      user = await User.findOneAndUpdate(filter, update, { new: true });
    }

    const userVerified = jwt.verify(user.token, accessTokenSecret);
    if (!userVerified) {
      const refreshToken = jwt.sign({ email: user.email }, accessTokenSecret);
      const filter = { email: req.body.email };
      const update = { token: refreshToken };

      user = await User.findOneAndUpdate(filter, update, { new: true });
    }

    const response = {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: user.token,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
