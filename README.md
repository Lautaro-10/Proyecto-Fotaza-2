# Fotaza - Proyecto Universitario

Fotaza es una aplicación web inspirada en Pinterest e Instagram donde los usuarios pueden almacenar, buscar, valorar y compartir sus mejores fotografías con el mundo.

##  Requisitos Cumplidos (Rúbrica)
- **Creación de Publicaciones:** Carga de imágenes locales con procesamiento mediante Multer.
- **Buscador de Publicaciones:** Búsqueda en tiempo real por título en la barra superior.
- **Módulo de Comentarios:** Integrado debajo de cada fotografía.
- **Valoración de Imágenes:** Sistema de 1 a 5 estrellas con cálculo automático de promedio.
- **Seguimiento de Usuarios:** Posibilidad de seguir a otros fotógrafos y ver su red de contactos.

## Tecnologías y Librerías Utilizadas
- **Express.js:** Framework minimalista para manejar las rutas y el servidor web.
- **Sequelize:** ORM para interactuar con la base de datos MySQL mediante modelos en lugar de consultas SQL puras.
- **Multer:** Middleware para gestionar la subida de archivos (fotografías) 
- **Pug:** Motor de plantillas (Template Engine) para renderizar vistas HTML dinámicas en el servidor.
- **Bcryptjs:** Librería de criptografía para hashear (encriptar) contraseñas antes de guardarlas en la base de datos.
- **Express-Session:** Para mantener la sesión del usuario iniciada de forma segura usando cookies.
- **Dotenv:** Para proteger credenciales sensibles (claves de base de datos) usando variables de entorno.

## Resumen de Endpoints (Rutas)
### Públicas
- `GET /`: Muro principal (Feed) donde se ven todas las publicaciones.
- `GET /buscar?q=...`: Buscador de publicaciones por título.
- `GET /login`, `POST /login`: Formulario y procesamiento de inicio de sesión.
- `GET /register`, `POST /register`: Formulario y procesamiento de registro de usuarios.
### Privadas (Requieren autenticación)
- `GET /posts`: Muro personal con las publicaciones del usuario logueado.
- `GET /posts/crear`, `POST /posts/crear`: Formulario y subida de nuevas fotos.
- `POST /posts/:id/comentar`: Crea un nuevo comentario en una publicación.
- `POST /posts/:id/valorar`: Crea o actualiza la valoración (1 a 5 estrellas) de una foto.
- `GET /followers`: Muestra las listas de "Siguiendo" y "Seguidores".
- `POST /followers/seguir/:id`: Sigue a otro usuario.
- `POST /followers/dejar-seguir/:id`: Deja de seguir a un usuario.

## Usuarios de Prueba y Seed
Para generar rápidamente los usuarios de prueba. Simplemente ejecuta en la terminal:
`node seed.js`

Esto creará automáticamente los siguientes usuarios en tu base de datos:
1. **Correo:** `profesor@fotaza.com` / **Contraseña:** `123456`
2. **Correo:** `alumno@fotaza.com` / **Contraseña:** `123456`

## Enlaces Importantes
- **Repositorio de GitHub:** https://github.com/Lautaro-10/Proyecto-Fotaza-2
- **Enlace del Deploy (Railway):** 
- **Video Demostrativo (3 min):**

---

### Notas de Desarrollo y Problemas Encontrados
*  **Errores de NPM en Windows:** Al arrancar, renegué bastante porque la terminal me tiraba errores de red y de certificados SSL al querer instalar los módulos con `npm install`. Después de buscar un rato, logré destrabarlo desactivando temporalmente la validación estricta de SSL en la configuración de npm (`npm config set strict-ssl false`) para que me dejara bajar las librerías.
*   **Las imágenes desaparecían en el deploy (Railway):** En mi computadora las fotos se subían y se guardaban perfecto en la carpeta `/public/uploads`. El problema fue que al subir el proyecto a Railway, las imágenes se borraban solas cada vez que el servidor se reiniciaba o hacía un cambio. Resulta que estas plataformas gratuitas no guardan archivos locales de forma permanente. Para esta entrega el sistema funciona perfecto localmente, pero entiendo que la solución definitiva a futuro sería cambiar Multer para que guarde las fotos en la nube (como Cloudinary o AWS S3).

*   **El script de arranque `db:init`:** Un requisito estricto era inicializar las tablas usando el comando `npm run db:init`. Al principio intenté poner mi archivo `.sql` directamente en el `package.json`, pero tiraba error porque la consola no lo reconocía. Lo terminé solucionando al crear un archivo intermedio en Node (`initDB.js`) que lee mi archivo de base de datos usando el módulo `fs` y ejecuta las consultas conectándose mediante las variables ocultas en el `.env`.

*   **Normalización de la Base de Datos a 3FN:** Me costó un poco pensar el diseño para no romper la Tercera Forma Normal (3FN). Como una publicación podía tener varias fotos y cada foto reglas de copyright distintas, tuve que evitar meter todo en una sola tabla y aprender a separar bien la tabla `publicaciones` de la tabla `imagenes`, armando también tablas intermedias para las etiquetas.
