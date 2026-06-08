const express = require('express');
const { Usuario } = require('../models/index');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login.pug');
});

router.post('/', async (req, res) => {
  const correo = req.body['correo-usuario'];
  const password = req.body['password-usuario'];
  
  try {
    const usuario = await Usuario.findOne({ where: { email: correo } });
    
    if (!usuario) {
      return res.send('Correo electrónico no encontrado');
    }
    
    const esValida = await usuario.validarPassword(password);
    
    if (!esValida) {
      return res.send('Contraseña incorrecta');
    }
    
    req.session.usuarioId = usuario.id_usuario;
    req.session.usuarioNombre = usuario.nombre;
    
    console.log('¡Inicio de sesión exitoso!');
    res.redirect('/');
    
  } catch (error) {
    console.log('Error en el login: ', error);
    res.send('Error en el servidor');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;