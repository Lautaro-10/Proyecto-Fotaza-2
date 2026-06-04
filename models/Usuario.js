const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'usuarios',
  timestamps: false, 
  hooks: {

    beforeCreate: async (usuario) => {
      if (usuario.password_hash) {
        const salt = await bcrypt.genSalt(10);
        usuario.password_hash = await bcrypt.hash(usuario.password_hash, salt);
      }
    }
  }
});


Usuario.prototype.validarPassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = Usuario;
