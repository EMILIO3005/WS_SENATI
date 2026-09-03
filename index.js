const express = require('express');     //Framework
const mysql = require('mysql2');        //Acceso a la base de datos
const bodyParser = require('body-parser');    //Manejo de datos (JSON - FORM)
const PORT = 3000;  //Puerto es el canal de comunicacion

const app = express();
app.use(bodyParser.json()); //Formato de intercambio de datos

//Configurar la conexion
//  - Pendiente .env
//  - pendiente poolConexion
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'SENATI'
});


// VERIFICAR LA CONEXION
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos SENATI')
});


//Verbos HTTP
//require  : requeriiento||solicitud
//result   : respuesta
//Crear
app.post('/alumnos', (require, result) => {
  //Paso 1: Debemos recibir los datos que ingresan como JSON(DESERIALIZADO)
  const {apellidos, nombres, telefono, direccion, email} = require.body;

  //Paso 2: CONSULTA SQL
  const sql = `INSERT INTO alumnos(apellidos, nombres, telefono, direccion, email)
	VALUES (?,?,?,?,?)   
    `;

  //Paso 3: Ejecutar la consulta
  //db.query(consultasql, valoresComodines, eresultado)
  db.query(sql, [apellidos, nombres, telefono, direccion, email], (err, res) => {
    //Si entramos en la condicion, EXISTE EL ERROR
    if (err) return result.status(500).send(err);
    result.send({message: "Registro guardado", id: res.insertId});
  });


 // result.send({'valores': require.body})
  //const {apellidos, nombres, telefono} = req.body;

});




//Actualizar
//Ruta queda = http://localhost:3000/alumnos/1
app.put('/alumnos/:id', (require, result) =>{
  const { id } = require.params;
  //Paso 2: Obtener los datos
  const { apellidos, nombres, telefono, direccion, email } = require.body;
  //Construir la consulta
  const sql = `UPDATE Alumnos SET 
    apellidos = ?,
    nombres = ?, 
    telefono = ?,
    direccion = ?,
    email = ? 
    WHERE id = ?
    `;
  db.query(sql, [apellidos, nombres, telefono, direccion, email, id], (err, res) => {
  if (err) return res.status(500).send(err);
  result.send({ message: 'Alumno actualizado' });
  });
});


//Listar
app.get('/alumnos', (require, result) => {
  const sql = `SELECT id, apellidos, nombres, telefono, direccion, email
  FROM alumnos
    ORDER BY id DESC
    LIMIT 20;
    `;
  db.query(sql, (err, res) =>{
    if (err) return result.status(500).send(err);
    res.json(res);
  })
});


//Buscar
//Ruta queda = http://localhost:3000/alumnos/1
app.get('/alumnos/:id', (require, result) => {
  const {id} = require.params;
  const sql = `SELECT id, apellidos, nombres, telefono, direccion, email FROM alumnos WHERE id=?`;

  db.query(sql, [id], (err, res) =>{
    if (err) return result.status(500).send(err);
    if (res.length == 0) return result.status(404).send({message: "No encontrado"}) 

    return result.json(res[0])//Retorna un array
  })
});

//Eliminar
//Ruta queda = http://localhost:3000/alumnos/1
app.delete('/alumnos/:id', (require, result) =>{
  const {id} = require.params;
  const sql = 'DELETE FROM alumnos WHERE id = ?';


  db.query(sql, [id], (err, res) =>{

    //en acaso de error...
    if (err) return result.status(500).send(err);
    if (res.affectedRows == 0) return result.status(404).send({message: "No encontrado"})
    return result.send({ message: 'Alumno eliminado' })
  });

});


//Iniciando el servidor del webservice
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
});
