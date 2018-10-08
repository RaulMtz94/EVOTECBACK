//Requires importacion de librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//---------------------------------


//inicializar variables
var app = express();


//Body parser
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

//importe de rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');



//CONEXION A LA BASE DE DATOS
mongoose.connection.openUri('mongodb://raul:raulmtz1@ds111993.mlab.com:11993/evotecbd' , (err , res)=>{
    if(err) throw err;
    console.log('Base de datos MongoDB : \x1b[32m%s\x1b[0m' , 'Online');   
});

//Rutas
app.use('/usuario' , usuarioRoutes);
app.use('/login' , loginRoutes);
app.use('/' , appRoutes);


//Escuchar peticiones

app.listen(3000 , () => {
    console.log('Express server puerto 3000 : \x1b[32m%s\x1b[0m' , 'Online');
});