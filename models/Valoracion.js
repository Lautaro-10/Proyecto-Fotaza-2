const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Valoracion = sequelize.define('Valoracion', {
  id_valoracion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  tableName: 'valoraciones',
  timestamps: false
});

module.exports = Valoracion;
