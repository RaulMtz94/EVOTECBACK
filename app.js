//Requires importacion de librerias
var express = require('express');
var mongoose = require('mongoose');
//---------------------------------


//inicializar variables
var app = express();


//CONEXION A LA BASE DE DATOS
mongoose.connection.openUri('mongodb://raul:raulmtz1@ds111993.mlab.com:11993/evotecbd' , (err , res)=>{
    if(err) throw err;
    console.log('Base de datos MongoDB : \x1b[32m%s\x1b[0m' , 'Online');
   
});

//Rutas
app.get('/', (req , res , next) =>{
    res.status(200).json({
        ok : true ,
        mensaje : 'Peticion Realizada Correctamente'
    });
});

//Escuchar peticiones

app.listen(3000 , () => {
    console.log('Express server puerto 3000 : \x1b[32m%s\x1b[0m' , 'Online');
});