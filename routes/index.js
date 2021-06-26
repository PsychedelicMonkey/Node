const express = require('express');
const router = express.Router();
const { ensureAuthentication } = require('../config/auth');

router.get('/', ensureAuthentication, (req, res) => {
  res.render('index', { user: req.user });
});

module.exports = router;
