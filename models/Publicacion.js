const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Publicacion = sequelize.define('Publicacion', {
  id_publicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  tableName: 'publicaciones',
  timestamps: true, 
});

module.exports = Publicacion;
