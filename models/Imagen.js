const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Imagen = sequelize.define('Imagen', {
  id_imagen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ruta_archivo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  licencia: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  marca_agua: {
    type: DataTypes.STRING(100),
    defaultValue: false
  }
}, {
  tableName: 'imagenes',
  timestamps: false
});

module.exports = Imagen;
