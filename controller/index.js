const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const { Publicacion, Imagen, Comentario, Valoracion, Usuario } = require('../models/index');

router.get('/', async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      order: [['id_publicacion', 'DESC']], 
      include: [
        { model: Imagen },
        { model: Usuario }, // Autor de la foto
        { 
          model: Comentario, 
          include: [{ model: Usuario }] 
        },
        { model: Valoracion }
      ]
    });
    const publicacionesConPromedio = publicaciones.map(pub => {
      let promedio = 0;
      if (pub.Valoracions && pub.Valoracions.length > 0) {
        const suma = pub.Valoracions.reduce((acc, val) => acc + val.puntuacion, 0);
        promedio = (suma / pub.Valoracions.length).toFixed(1);
      }
      const pubData = pub.toJSON();
      pubData.promedio_estrellas = promedio;
      return pubData;
    });

    res.render('index.pug', { publicaciones: publicacionesConPromedio });
  } catch (error) {
    console.error("Error al cargar el feed:", error);
    res.send("Error al cargar la portada");
  }
});

router.get('/buscar', async (req, res) => {
  try {
    const query = req.query.q;
    const publicaciones = await Publicacion.findAll({
      where: { titulo: { [Op.like]: `%${query}%` } },
      order: [['id_publicacion', 'DESC']],
      include: [
        { model: Imagen },
        { model: Usuario },
        { 
          model: Comentario, 
          include: [{ model: Usuario }] 
        },
        { model: Valoracion }
      ]
    });

    const publicacionesConPromedio = publicaciones.map(pub => {
      let promedio = 0;
      if (pub.Valoracions && pub.Valoracions.length > 0) {
        const suma = pub.Valoracions.reduce((acc, val) => acc + val.puntuacion, 0);
        promedio = (suma / pub.Valoracions.length).toFixed(1);
      }
      const pubData = pub.toJSON();
      pubData.promedio_estrellas = promedio;
      return pubData;
    });

    res.render('index.pug', { publicaciones: publicacionesConPromedio, busqueda: query });
  } catch (error) {
    console.error("Error en búsqueda:", error);
    res.send("Error al buscar");
  }
});

module.exports = router;