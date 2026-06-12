require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, Usuario } = require('./models/index');

async function runSeed() {
  try {
    await sequelize.sync();
    
    console.log('Iniciando el proceso de Seed (Semilla)...');

    const usuarios = [
      {
        nombre: 'Profesor',
        apellido: 'Test',
        username: 'profesor_fotaza',
        email: 'profesor@fotaza.com',
        password_hash: '123456'
      },
      {
        nombre: 'Alumno',
        apellido: 'Prueba',
        username: 'alumno_test',
        email: 'alumno@fotaza.com',
        password_hash: '123456'
      }
    ];

    for (let u of usuarios) {
      const existe = await Usuario.findOne({ where: { email: u.email } });
      if (!existe) {
        await Usuario.create(u);
        console.log(`Usuario creado: ${u.email}`);
      } else {
        console.log(`El usuario ${u.email} ya existe en la base de datos.`);
      }
    }

    console.log('Seed completado exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al correr el seed:', error);
    process.exit(1);
  }
}

runSeed();
