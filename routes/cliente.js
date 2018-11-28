var express = require('express');
var app = express();
var Cliente = require ('../models/cliente');
var estadoACT = require ('../models/estadoclienteACT');
var estadoIN = require('../models/estadoclienteIN');
var midAuth = require('../middlerwares/auth');


//Rutas
//==============================================
//Consultar clientes
//==============================================
app.get('/', (req , res , next) =>{
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Cliente.find({  } )
        
        .exec(
         (err, clientes) => {
        if (err) {
           return res.status(500).json({
                ok : false ,
                mensaje : 'Error cargando clientes',
                errors: err
            });
        }
        Cliente.count({} , (err , conteo)=>{
            res.status(200).json({
                ok : true ,
                mensaje : 'Clientes',
                clientes : clientes,
                total:conteo
            });
        });
       
    })
});
//==============================================
//Consultar estado actual del cliente
//==============================================
app.get('/estadoACT/:id', (req , res , next) =>{
    var id = req.params.id;
    
    estadoACT.find({usuario:id  })
        .exec(
         (err, clientes) => {
        if (err) {
           return res.status(500).json({
                ok : false ,
                mensaje : 'Error cargando clientes',
                errors: err
            });
        }
        res.status(200).json({
            estado : clientes
        });
    });
});


//==============================================
//Actualizar estado del cliente
//==============================================
app.put ('/actualizarEstado/:id',(req , res) => {
    var body  = req.body;
    var id = req.params.id;
    var now = new Date();
    var fechaNueva = now.getDay() +  '/' + now.getMonth() + '/' +now.getFullYear();
    var estadoI = new estadoIN({
        peso : body.peso,
        IMC : body.IMC,
        estatura : body.estatura,
        pecho : body.pecho,
        brazo :  body.brazo,
        cintura : body.cintura,
        gluteo : body.gluteo,
        muslo : body.muslo,
        usuario : id ,
        fecha : fechaNueva
    });
    
    estadoACT.findOne({usuario:id} , (err , state)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
         if(!state){

            var estado = new estadoACT({
                peso : body.peso,
                IMC : body.IMC,
                estatura : body.estatura,
                pecho : body.pecho,
                brazo :  body.brazo,
                cintura : body.cintura,
                gluteo : body.gluteo,
                muslo : body.muslo,
                usuario : id 
            });

            estado.save( (err , state) =>{
                if (err) {
                    return res.status(400).json({
                         ok : false ,
                         mensaje : 'Error al crear estado',
                         errors: err
                     });
                 }
                 estadoI.save((err, state)=>{
                    if(err){
                        return res.status(400).json({
                            ok : false ,
                            mensaje : 'Error al crear estado',
                            errors: err
                        });
                    }
                    res.status(201).json({
                        ok : true ,
                         cliente:state
                    });
                 });
                 
                    
            });//FIN DEL GUARDADO
        }else{
            state.peso = body.peso;
            state.IMC = body.IMC;
            state.estatura = body.estatura;
            state.pecho = body.pecho;
            state.brazo =  body.brazo;
            state.cintura = body.cintura;
            state.gluteo = body.gluteo;
            state.muslo = body.muslo;
            state.usuario = id ;
       
        state.save( (err , clienteGuardado) =>{
            if (err) {
                return res.status(400).json({
                     ok : false ,
                     mensaje : 'Error al subir estado de cliente',
                     errors: err
                 });
             } 
             estadoI.save((err, state)=>{
                if(err){
                    return res.status(400).json({
                        ok : false ,
                        mensaje : 'Error al crear estado',
                        errors: err
                    });
                }
                res.status(201).json({
                    ok : true ,
                     cliente:state
                });
             });
        }); 
        } //FIN ELSE
    });
});



//==============================================
//Actualizar cliente
//==============================================

app.put('/:id' ,[midAuth.verificaToken,midAuth.verificaADMIN_ROLE ], (req,res)=>{

    var id = req.params.id;
    var body = req.body;

    Cliente.findById( id , (err, cliente) => {

        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar cliente',
                 errors: err
             });
         }
         if(!cliente){
            return res.status(400).json({
                ok : false ,
                mensaje : 'El cliente con el id' + id + 'no existe',
                errors: {message : 'No existe un cliente con ese ID'}
            });
         }
         if(body.estatus === false){
            cliente.estatus = body.estatus;
            cliente.save((err , clienteGuardado) =>{

                if (err) {
                    return res.status(400).json({
                         ok : false ,
                         mensaje : 'Error al actualizar cliente',
                         errors: err
                     });
                 }
                 res.status(200).json({
                    ok : true ,
                     cleinte:clienteGuardado
                });
    
             });
         }else if(body.estatus===true){
            cliente.estatus = body.estatus;
            cliente.save((err , clienteGuardado) =>{

                if (err) {
                    return res.status(400).json({
                         ok : false ,
                         mensaje : 'Error al actualizar cliente',
                         errors: err
                     });
                 }
                 res.status(200).json({
                    ok : true ,
                     cleinte:clienteGuardado
                });
    
             });
         }
         else{
            cliente.nombre = body.nombre;
            cliente.apellidoP = body.apellidoP;
            cliente.apellidoM = body.apellidoM;
            cliente.domicilio = body.domicilio;
            cliente.telefono = body.telefono;
            cliente.save((err , clienteGuardado) =>{
   
               if (err) {
                   return res.status(400).json({
                        ok : false ,
                        mensaje : 'Error al actualizar cliente',
                        errors: err
                    });
                }
                res.status(200).json({
                   ok : true ,
                    cleinte:clienteGuardado
               });
   
            });
         }
        


    });
});


module.exports = app;