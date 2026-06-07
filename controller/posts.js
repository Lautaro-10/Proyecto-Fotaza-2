const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.usuarioId) {
    return res.redirect('/login');
  }
  res.render('posts.pug');
});

module.exports = router;