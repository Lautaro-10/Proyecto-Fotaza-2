const express = require('express');
const upload = require('../config/multer');
const { Publicacion, Imagen } = require('../models/index');
const router = express.Router();

// Validar que el usuario esté logueado
router.use((req, res, next) => {
  if (!req.session.usuarioId) {
    return res.redirect('/login');
  }
  next();
});

router.get('/', async(req, res) => {
try{
  const misPublicaciones = await Publicacion.findAll({
    where: { id_usuario: req.session.usuarioId },
    include: [Imagen]
  });
  res.render('posts.pug', { publicaciones: misPublicaciones });
}catch(error){
  console.error("Error al buscar publicaciones:", error);
  res.send('Error interno del servidor');
}
});

router.get('/crear', (req, res) => {
  res.render('crear_post.pug');
});

router.post('/crear', upload.single('foto'), async (req, res) => {
  try {
    const nuevaPub = await Publicacion.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      id_usuario: req.session.usuarioId 
    });

    if (req.file) {
      await Imagen.create({
        ruta_archivo: '/uploads/' + req.file.filename,
        licencia: req.body.licencia || 'Ninguna',
        marca_agua: req.body.marca_agua === 'on' ? true : false,
        id_publicacion: nuevaPub.id_publicacion
      });
    }

    res.redirect('/posts');
  } catch (error) {
    console.error('Error al subir publicación:', error);
    res.send('Ocurrió un error al subir la foto.');
  }
});

module.exports = router;