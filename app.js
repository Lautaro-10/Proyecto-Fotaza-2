const express = require('express');
const db = require('./config/db');
const app = express();
const indexRouter = require('./controller/index');
const loginRouter = require('./controller/login');
const registerRouter = require('./controller/register');
const followersRouter = require('./controller/followers');
const our_storyRouter = require('./controller/our_story');
const postsRouter = require('./controller/posts');



app.set('view engine', 'pug');

// Middle Ware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/followers', followersRouter);
app.use('/our_story', our_storyRouter);
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http:\\localhost:${PORT}`);
});