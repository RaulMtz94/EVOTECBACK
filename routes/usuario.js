var express = require('express');
var app = express();
var Usuario = require ('../models/usuario');
var Cliente = require ('../models/cliente');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var midAuth = require('../middlerwares/auth');
//var SEED = require('../config/config').SEED;
//Rutas
//==============================================
//Consultar usuarios
//==============================================
app.get('/', (req , res , next) =>{
    Usuario.find({  } , 'nombre email img role')
        .exec(
         (err, usuarios) => {
        if (err) {
           return res.status(500).json({
                ok : false ,
                mensaje : 'Error cargando usuarios',
                errors: err
            });
        }
        res.status(200).json({
            
            ok : true ,
            mensaje : 'Usuarios',
            usuarios : usuarios
        });
    })
});

//==============================================
//Crear un nuevo usuario
//==============================================
app.post ('/',(req , res) => {
    var body  = req.body;
    var usuario = new Usuario({
        nombre : body.nombre,
        email : body.email ,
        password: bcrypt.hashSync( body.password , 10), 
        img : body.img ,
        role : body.role
    });
   
    

    usuario.save( (err , usuarioGuardado) =>{
        if (err) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Error al crear usuario',
                 errors: err
             });
         }
         if(body.role === 'USER_ROLE'){
             console.log('Usuario semi-creado');
             console.log('El usuario es :'+usuarioGuardado._id);
            // altaCliente(usuarioGuardado._id,body , res , res);
            var now = new Date();
            var cliente = new Cliente({
                nombre : body.nombre,
                apellidoP : body.apellidoP,
                apellidoM: body.apellidoM,
                domicilio : body.domicilio,
                telefono : body.telefono,
                fechaAlta : now,
                fechaVencimiento : body.fechaVencimiento,
                img : body.img,
                estatus : body.estatus,
                usuario:usuarioGuardado.id
            });
            cliente.save( (err , clienteGuardado) =>{
                if (err) {
                    return res.status(400).json({
                         ok : false ,
                         mensaje : 'Error al crear cliente',
                         errors: err
                     });
                 }
                 
                    res.status(201).json({
                        ok : true ,
                         cliente:clienteGuardado,
                         clientetoken : req.cliente
                    });
                 
            });//FIN DEL GUARDADO
            //-*-------------------------------------------------
         }else{
            res.status(201).json({
                ok : true ,
                 usuario:usuarioGuardado,
                 usuariotoken : req.usuario
            });
         }
         
    });  
});


//==============================================
//Actualizar usuario
//==============================================
app.put('/:id',midAuth.verificaToken , (req,res)=>{

    var id = req.params.id;
    var body = req.body;

    Usuario.findById( id , (err, usuario) => {

        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
         if(!usuario){
            return res.status(400).json({
                ok : false ,
                mensaje : 'El usuario con el id' + id + 'no existe',
                errors: {message : 'No existe un usuario con ese ID'}
            });
         }
         usuario.nombre = body.nombre;
         usuario.email = body.email;
         usuario.role = body.role;
         usuario.save((err , usuarioGuardado) =>{

            if (err) {
                return res.status(400).json({
                     ok : false ,
                     mensaje : 'Error al actualizar usuario',
                     errors: err
                 });
             }
             usuarioGuardado.password = ':)';
             res.status(200).json({
                ok : true ,
                 usuario:usuarioGuardado
            });

         });


    });
});

//==============================================
//Borrar un usuario por el ID
//==============================================

app.delete('/:id',midAuth.verificaToken, (req , res)=>{
    var id = req.params.id;
Usuario.findByIdAndRemove(id , (err , usuarioBorrado)=>{
    if (err) {
        return res.status(500).json({
             ok : false ,
             mensaje : 'Error al borrar usuario',
             errors: err
         });
     }

     if (!usuarioBorrado) {
        return res.status(400).json({
             ok : false ,
             mensaje : 'No existe un usuario con ese id',
             errors: {message:'No existe ningun usuario con ese id'}
         });
     }
     res.status(200).json({
        ok : true ,
         usuario:usuarioBorrado
    });
});

});

module.exports = app;