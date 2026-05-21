const express = require('express');
const router = express.Router();

router.get('/followers', (req, res) => {
  res.render('followers.pug');
});

module.exports = router;