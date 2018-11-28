var express = require('express');
var app = express();
var hco_visitas = require ('../models/hco_visitas');



//Rutas
//==============================================
//Consultar usuarios
//==============================================
app.get('/', (req , res , next) =>{
    hco_visitas.find({  } )
        .exec(
         (err, hco) => {
        if (err) {
           return res.status(500).json({
                ok : false ,
                mensaje : 'Error cargando historico',
                errors: err
            });
        }
        res.status(200).json({
            
            ok : true ,
            mensaje : 'Historico visitas',
            historicos : hco
        });
    })
});

//==============================================
//Crear un nuevo usuario
//==============================================
app.post ('/',(req , res) => {
    var body  = req.body;
    var fecha = new Date();
    var month = ((fecha.getMonth() + 1) < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);

    //instancia del historico
    var historico = new hco_visitas({
        nombre : body.nombre , 
        fecha : fecha.getDay() +'/'+ fecha.getMonth() +'/'+ fecha.getFullYear(),
        socio : body.socio,
        monto : body.monto,
        correo : body.correo,
        usuario : body.usuario
    });
   
    

    historico.save( (err , hcoGuardado) =>{
        if (err) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Error al guardar historico',
                 errors: err
             });
         }
        
            res.status(201).json({
                ok : true ,
                mensaje : 'Historico Guardado',
                historico:hcoGuardado
            });
                  
    });  
});





module.exports = app;