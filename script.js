const boton = document.getElementById('boton-main');
let encendido = false;
function cambiarTexto(){
  if(!encendido){
    boton.innerText = 'cambio';
    encendido = true;
  }else{
    boton.innerText = 'Cambiar tema';
    encendido = false;
  }
  return;
}