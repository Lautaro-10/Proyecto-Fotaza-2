const db = require('../config/db');

class User {
  static createUser(username, nombre, apellido, email, password) {
    return new Promise((resolve, reject) => {
      const ordenSql = 'INSERT INTO usuarios (username, nombre, apellido, email, password_hash, id_rol) VALUES (?, ?, ?, ?, ?, ?)';
      const idRol = 1;

      db.query(ordenSql, [username, nombre, apellido, email, password, idRol], (err, resultado) => {
        if (err) {
          reject(err);
        } else {
          resolve(resultado);
        }
      });
    });
  }

}

module.exports = User;
