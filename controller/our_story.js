const express = require('express');
const router = express.Router();

router.get('/our_story', (req, res) => {
  res.render('our_story.pug');
});

module.exports = router;