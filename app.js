const express = require('express');
const app = express();

app.set('view engine', 'pug');


app.get('/', (req, res) => {


  res.render('index.pug');
});


app.use(express.static('public'));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http:\\localhost:${PORT}`);
});

app.get('/register', (req, res) => {
  res.render('register.pug');
});

app.get('/followers', (req, res) => {
  res.render('followers.pug');
});

app.get('/our_story', (req, res) => {
  res.render('our_story.pug');
});

app.get('/posts', (req, res) => {
  res.render('posts.pug');
});