var express = require('express');
var app = express();
var estado = require('../models/estadoclienteIN');
//Rutas
app.get('/:busqueda', (req , res , next) =>{
    var busqueda = req.params.busqueda;
    estado.find({usuario : busqueda} , (err , progreso)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar progreso'
             });
         }
        res.status(200).json({
            ok : true ,
            mensaje : progreso
        });
    });   
});
module.exports = app;