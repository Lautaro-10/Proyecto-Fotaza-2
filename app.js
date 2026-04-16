const express = require('express');
const app = express();

app.set('view engine', 'pug');


app.get('/',(req, res) => {
  console.log('Hola mundo');
  
  res.render('index.pug')
})


const PORT = process.env.PORT || 3000
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http:\\localhost:${PORT}`);
});