// Funciones en JS se puede crear...

//Caso 1: REUTILIZAR
function hacerTarea(nombreTarea){

}
  hacerTarea('Programar');
  hacerTarea('Cocinar');
  hacerTarea('Jugar');

//CASO 2:
//Anonimo (pasa como parametro)
const variable = function(){}


//CASO 3:
//Funciones flecha
const otraVariable = () =>{}

//DESERIALIZACION

//const apellidos = require.body.apellidos;
//const nombres = require.body.nombres;
//const telefono = require.body.telefono;

const {apellidos, nombres, telefono} = req.body
