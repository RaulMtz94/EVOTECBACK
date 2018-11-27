var express = require('express');
var app = express();
var instructor = require ('../models/instructor');
//Rutas
app.get('/', (req , res , next) =>{

    
    instructor.find({  } )
        
        .exec(
         (err, clientes) => {
        if (err) {
           return res.status(500).json({
                ok : false ,
                mensaje : 'Error cargando instructores',
                errors: err
            });
        }
            res.status(200).json({
                ok : true ,
                mensaje : 'Instructores',
                instructores : clientes,
               
            });
       
       
    })
});
//==============================================
//Crear un nuevo instructor
//==============================================
app.post ('/',(req , res) => {
    var body  = req.body;
    var now = new Date();
    var usuario = new instructor({
        nombre : body.nombre,
        estudios : body.estudios,
        horario : body.horario,
        fecha : now,
        img : body.img,
        estatus : true
    });
   
    

usuario.save( (err , usuarioGuardado) =>{
        if (err) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Error al crear instructor',
                 errors: err
             });
         }
            res.status(201).json({
                ok : true ,
                 usuario:usuarioGuardado
            });
    });  
});

module.exports = app;