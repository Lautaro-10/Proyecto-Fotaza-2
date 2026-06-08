const sequelize = require("../config/db");
const {DATATYPES, DataTypes} = require('sequelize');

const Comentario = sequelize.define('Comentario', {
id_comentario:{
  type:DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
},
  comentario: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'comentarios',
  timestamps: false
});



module.exports = Comentario;