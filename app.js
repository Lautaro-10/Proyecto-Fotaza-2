require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { sequelize } = require('./models/index');

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

// Configurar Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'mi_secreto_seguro_fotaza',
  resave: false,
  saveUninitialized: false
}));

// Pasar variables de sesión a PUG
app.use((req, res, next) => {
  res.locals.usuarioId = req.session.usuarioId;
  res.locals.usuarioNombre = req.session.usuarioNombre;
  next();
});

// Sincronizar Base de Datos
sequelize.sync()
  .then(() => console.log('Tablas sincronizadas con Sequelize'))
  .catch(err => console.log('Error sincronizando base de datos:', err));

// Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/followers', followersRouter);
app.use('/our_story', our_storyRouter);
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});