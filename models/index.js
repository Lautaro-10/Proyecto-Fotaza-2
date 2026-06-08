const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const Imagen = require('./Imagen');
const Comentario = require('./Comentario');

Usuario.hasMany(Publicacion, { foreignKey: 'id_usuario' });
Publicacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Publicacion.hasMany(Imagen, { foreignKey: 'id_publicacion' });
Imagen.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

Publicacion.hasMany(Comentario, { foreignKey: 'id_publicacion'});
Comentario.belongsTo(Publicacion, {foreignKey: 'id_publicacion'})

module.exports = {
  sequelize,
  Usuario,
  Publicacion,
  Imagen,
  Comentario
};
