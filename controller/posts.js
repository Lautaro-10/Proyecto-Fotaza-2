const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('posts.pug');
});

module.exports = router;