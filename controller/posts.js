const express = require('express');
const upload = require('../config/multer');
const { Publicacion, Imagen, Comentario, Valoracion, Usuario } = require('../models/index');
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
    include: [
      { model: Imagen },
      { 
        model: Comentario, 
        include: [{ model: Usuario }] 
      },
      { model: Valoracion }
    ]
  });

  const publicacionesConPromedio = misPublicaciones.map(pub => {
    let promedio = 0;
    if (pub.Valoracions && pub.Valoracions.length > 0) {
      const suma = pub.Valoracions.reduce((acc, val) => acc + val.puntuacion, 0);
      promedio = (suma / pub.Valoracions.length).toFixed(1);
    }
    const pubData = pub.toJSON();
    pubData.promedio_estrellas = promedio;
    return pubData;
  });

  res.render('posts.pug', { publicaciones: publicacionesConPromedio });
}catch(error){
  console.error("Error al buscar publicaciones:", error);
  res.send('Error interno del servidor');
}
});

router.post('/:id/comentar', async (req, res) => {
  try {
    await Comentario.create({
      comentario: req.body.texto_comentario,
      id_publicacion: req.params.id,
      id_usuario: req.session.usuarioId
    });
    const backURL = req.get('referer') || '/posts';
    res.redirect(backURL);
  } catch (error) {
    console.error(error);
    res.send('Error al guardar comentario');
  }
});

router.post('/:id/valorar', async (req, res) => {
  try {
    const valoracionExistente = await Valoracion.findOne({
      where: {
        id_publicacion: req.params.id,
        id_usuario: req.session.usuarioId
      }
    });

    if (valoracionExistente) {
      valoracionExistente.puntuacion = req.body.estrellas;
      await valoracionExistente.save();
    } else {
      await Valoracion.create({
        puntuacion: req.body.estrellas,
        id_publicacion: req.params.id,
        id_usuario: req.session.usuarioId
      });
    }
    
    const backURL = req.get('referer') || '/posts';
    res.redirect(backURL);
  } catch (error) {
    console.error(error);
    res.send('Error al guardar valoración');
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