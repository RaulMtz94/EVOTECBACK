var express = require('express');
var app = express();
var Usuario = require ('../models/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var midAuth = require('../middlerwares/auth');
//Rutas
app.get('/', (req , res , next) =>{
    res.status(200).json({
        ok : true ,
        mensaje : 'Peticion Realizada Correctamente'
    });
});








module.exports = app;