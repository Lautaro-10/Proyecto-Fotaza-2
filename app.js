const express = require('express');
const app = express();

app.set('view engine', 'pug');


app.get('/', (req, res) => {
  console.log('Hola mundo');
  console.log('Funcionaa');

  res.render('index.pug');
});


app.use(express.static('public'));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http:\\localhost:${PORT}`);
});