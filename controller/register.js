const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register.pug');
});

router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create({
      username: req.body['apodo-usuario'],
      nombre: req.body['nombre-usuario'],
      apellido: req.body['apellido-usuario'],
      email: req.body['correo-usuario'],
      password_hash: req.body['password-usuario'],
      id_rol: 1 
    });
    
    console.log('¡Usuario guardado con éxito y contraseña encriptada!');
    
    // Auto-login
    req.session.usuarioId = nuevoUsuario.id_usuario;
    req.session.usuarioNombre = nuevoUsuario.nombre;
    
    res.redirect('/');
  } catch (error) {
    console.log('Hubo un error al guardar el usuario: ', error);
    res.send('No se pudo guardar el usuario: ' + error.message);
  }
});

module.exports = router;