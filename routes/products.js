var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var models = require('../models');

router.put('/:id', async function (req, res, next) {
  try {
    req.body.photos = [];
    for (const file in req.files) {
      const id = Date.now();

      req.files[file].mv(
        path.join(
          __dirname,
          '..',
          'public',
          'uploads',
          `${id}-${req.files[file].name}`
        )
      );

      req.body.photos.push(`/uploads/${id}-${req.files[file].name}`);
    }

    const product = await models.Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
