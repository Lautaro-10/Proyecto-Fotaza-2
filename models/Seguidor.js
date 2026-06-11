const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seguidor = sequelize.define('Seguidor', {
  id_seguidor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_seguido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'seguidores',
  timestamps: false
});

module.exports = Seguidor;
