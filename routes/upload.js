var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app=express();
//modelos
var Usuario = require('../models/usuario');
 
app.use(fileUpload());
app.put('/:tipo/:id',(req,res,next)=> {
    var tipo = req.params.tipo;
    var id = req.params.id;
    //tipos de collecion
    var tiposValidos = ['clientes','usuarios'];
    if(tiposValidos.indexOf( tipo )< 0){
        return res.status(400).json({
            ok:false,
            mensaje:'Tipo de coleccion no es valida',
            errors: {message: 'Tipo de coleccion no es valida'}
        });
    }

    if(!req.files){
        return res.status(400).json({
            ok:false,
            mensaje:'No selecciono nada',
            errors: {message: 'Debe de seleccionar una imagen'}
        });
    }
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length -1]; 
    //extensiones aceptadas
    var extensionesValidas = ['png','jpg','gif','jpeg'];
    if(extensionesValidas.indexOf(extensionArchivo)<0){
        return res.status(400).json({
            ok:false,
            mensaje:'Extension no valida',
            errors: {message: 'Las extensiones validas son '+ extensionesValidas.join(', ')}
        });
    }
    ///Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo}`;
    //mover el archivo a un pad especifico
    var path  = `./uploads/${ tipo }/${ nombreArchivo }`;
    archivo.mv(path,err=>{
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al mover archivo',
                errors:err
            });
        }
        subirPorTipo(tipo, id, nombreArchivo, res);

            /*res.status(200).json({
                ok:true,
                mensaje:'Archivo movido',
                extensionArchivo:extensionArchivo
            });*/
        
    })
    
});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }


            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si existe, elimina la imagen  
            
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, function(err){
                    if(err){
                        return console.log(err);
                    }
                    console.log("Se subio el archivo");
                });
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            })


        });

    }
}
module.exports=app;