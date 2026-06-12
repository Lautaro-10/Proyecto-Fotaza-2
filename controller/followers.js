const express = require('express');
const { Usuario, Seguidor } = require('../models/index');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.usuarioId) {
    return res.redirect('/login');
  }
  next();
});

router.get('/', async (req, res) => {
  try {
    const usuarioLogueado = await Usuario.findByPk(req.session.usuarioId, {
      include: [
        { model: Usuario, as: 'Seguidores' },
        { model: Usuario, as: 'Siguiendo' }
      ]
    });
    
    res.render('followers.pug', { usuarioLogueado });
  } catch (error) {
    console.error("Error al cargar seguidores:", error);
    res.send("Error al cargar la página de seguidores.");
  }
});

router.post('/seguir/:id', async (req, res) => {
  try {
    const idSeguido = req.params.id;
    const idSeguidor = req.session.usuarioId;
    
    // Evitar seguirse a sí mismo
    if (idSeguido == idSeguidor) {
      return res.redirect('back');
    }

    // Verificar si ya lo sigue
    const existe = await Seguidor.findOne({
      where: { id_seguidor: idSeguidor, id_seguido: idSeguido }
    });

    if (!existe) {
      await Seguidor.create({
        id_seguidor: idSeguidor,
        id_seguido: idSeguido
      });
    }
    
    res.redirect(req.get('referer') || '/');
  } catch (error) {
    console.error("Error al seguir usuario:", error);
    res.send("Error al seguir al usuario.");
  }
});

router.post('/dejar-seguir/:id', async (req, res) => {
  try {
    const idSeguido = req.params.id;
    const idSeguidor = req.session.usuarioId;
    
    await Seguidor.destroy({
      where: { id_seguidor: idSeguidor, id_seguido: idSeguido }
    });
    
    res.redirect(req.get('referer') || '/followers');
  } catch (error) {
    console.error("Error al dejar de seguir:", error);
    res.send("Error al dejar de seguir al usuario.");
  }
});

module.exports = router;