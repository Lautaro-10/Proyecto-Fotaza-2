const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'fotaza_2'
});

connection.connect((error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conectado a la base de datos fotaza_2 con id ' + connection.threadId);
});

module.exports = connection;
