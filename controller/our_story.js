const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('our_story.pug');
});

module.exports = router;