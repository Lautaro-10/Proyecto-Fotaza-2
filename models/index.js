const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const Imagen = require('./Imagen');
const Comentario = require('./Comentario');

const Valoracion = require('./Valoracion');

Usuario.hasMany(Publicacion, { foreignKey: 'id_usuario' });
Publicacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Publicacion.hasMany(Imagen, { foreignKey: 'id_publicacion' });
Imagen.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

Publicacion.hasMany(Comentario, { foreignKey: 'id_publicacion'});
Comentario.belongsTo(Publicacion, {foreignKey: 'id_publicacion'});

Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Publicacion.hasMany(Valoracion, { foreignKey: 'id_publicacion' });
Valoracion.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

Usuario.hasMany(Valoracion, { foreignKey: 'id_usuario' });
Valoracion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = {
  sequelize,
  Usuario,
  Publicacion,
  Imagen,
  Comentario,
  Valoracion
};
