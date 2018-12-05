//Requires importacion de librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//---------------------------------


//inicializar variables
var app = express();

//Habilitando CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods" , "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });


//Body parser
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

//importe de rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var clienteRoutes = require('./routes/cliente');
var uploadRoutes = require('./routes/upload');
var imgRoutes = require('./routes/imagenes');
var busquedaRoutes = require('./routes/busqueda');
var hco_visitasRoutes = require('./routes/hco_visitas');
var dietasRoutes = require ('./routes/dietas');
var rutinasRoutes = require('./routes/rutinas');
var pagosRoutes = require('./routes/pagos');
var instructoresRoutes = require('./routes/instructores');
var historicoseguimientoRoutes = require('./routes/historicoseguimiento');
var cajeroRoutes = require('./routes/cajero')

//CONEXION A LA BASE DE DATOS
mongoose.connection.openUri('mongodb://raul:raulmtz1@ds111993.mlab.com:11993/evotecbd' , (err , res)=>{
    if(err) throw err;
    console.log('Base de datos MongoDB : \x1b[32m%s\x1b[0m' , 'Online');   
});
/*
//CONEXION LOCAL A LA BASE DE DATOS 
mongoose.connection.openUri('mongodb://localhost:27017/EvotecLocal' , (err , res)=>{
    if(err) throw err;
    console.log('Base de datos MongoDB : \x1b[32m%s\x1b[0m' , 'Online');   
});
//--------------------------------------
*/


//Rutas
app.use('/usuario' , usuarioRoutes);
app.use('/login' , loginRoutes);
app.use('/cliente' , clienteRoutes);
app.use('/upload' , uploadRoutes);
app.use('/img' , imgRoutes);
app.use('/busqueda' , busquedaRoutes);
app.use('/hcovisitas', hco_visitasRoutes);
app.use('/dietas' , dietasRoutes);
app.use('/rutinas' , rutinasRoutes);
app.use('/pagos' , pagosRoutes);
app.use('/instructores' , instructoresRoutes);
app.use('/historico' , historicoseguimientoRoutes);
app.use('/cajero' , cajeroRoutes);



//Todas las rutas deben estar por encima de esta ruta para que no la tomen como parametro
app.use('/' , appRoutes);


//Escuchar peticiones

app.listen(process.env.PORT || 4000 , () => {
    console.log('Express server : \x1b[32m%s\x1b[0m' , 'Online');
});