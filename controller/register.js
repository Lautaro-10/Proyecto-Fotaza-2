const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register.pug');
});

router.post('/', async (req, res) => {
  try {
    const apodoUsuario = req.body['apodo-usuario'];
    const nombreUsuario = req.body['nombre-usuario'];
    const apellidoUsuario = req.body['apellido-usuario'];
    const correoUsuario = req.body['correo-usuario'];
    const contraseñaUsuario = req.body['password-usuario'];

    const resultado = await User.createUser(
      apodoUsuario,
      nombreUsuario,
      apellidoUsuario,
      correoUsuario,
      contraseñaUsuario
    );

    console.log('¡Usuario guardado con éxito!');
    res.redirect('/');
  } catch (err) {
    console.log('Hubo un error al guardar el usuario: ' + err);
    res.send('No se pudo guardar el usuario');
  }
});

module.exports = router;