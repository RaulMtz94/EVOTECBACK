var express = require('express');
var app = express();
var Usuario = require ('../models/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var Cliente = require('../models/cliente');


app.post('/' , (req , res)=>{
    var body  = req.body;

    Usuario.findOne({email:body.email}, (err , usuarioBD)=>{

        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
         if (!usuarioBD) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Credenciales incorrectas-EMAIL',
                 errors: err
             });
         }
         if (!bcrypt.compareSync(body.password , usuarioBD.password)) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Credenciales incorrectas-password',
                 errors: err
             });
         }

         //Crear un token
         usuarioBD.password = ':)';
         var token = jwt.sign({usuario : usuarioBD} , SEED, { expiresIn : 14400 });
         //BUSCANDO AL USUARIO CLIENTE
         if(usuarioBD.role === 'USER_ROLE'){
            Cliente.find({'usuario':usuarioBD._id}, (err , cliente)=>{
                console.log('Entra por aqui y este es su rol : '+ usuarioBD.role);
               if (err) {
                   return res.status(500).json({
                        ok : false ,
                        mensaje : 'Error al buscar usuario',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok : true ,
                    usuario : usuarioBD,
                    token : token , 
                    id:usuarioBD._id ,
                    cliente : cliente,
                    menu:obtenerMenu(usuarioBD.role)
                });
            });
            
         }else{
              //-----------------------------

        res.status(200).json({
            ok : true ,
            usuario : usuarioBD,
            token : token , 
            id:usuarioBD._id ,
            menu:obtenerMenu(usuarioBD.role)
        });
         }
         
        
    });

    
});


function obtenerMenu(ROLE){
    /*
  var menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Inicio', url: '/dashboard' }
          ]
        },
        {
          titulo: 'Cuotas y Pagos',
          icono: 'mdi mdi-wallet-membership',
          submenu: [
            { titulo: 'Informacion de cuotas', url: '/infoCuotas' },
            { titulo: 'Estado de cuenta', url: '/estado' },
            { titulo: 'Renovaciones', url: '/renovacion' }
          ]
        },
        {
          titulo: 'Servicios',
          icono: 'mdi mdi-library-books',
          submenu: [
            { titulo : 'Mis Dietas', url: '/Dietas' },
            { titulo: 'Mis rutinas', url: '/Rutinas' },
            { titulo: 'Mi progreso', url: '/Progreso' }
          ]
        },
        {
          titulo: 'Entretenimiento',
          icono: 'mdi mdi-gamepad-variant',
          submenu: [
            { titulo: 'Foro de discusion', url: '/Foro' }
          ]
        },
        {
          titulo: 'Info. General',
          icono: 'mdi mdi-information-variant',
          submenu: [
            { titulo: 'Instructores y clases', url: '/Instructores' },
            { titulo : 'Promociones', url: '/Promociones' }      ]
        },
        {
          titulo: 'CRUD Clientes',
          icono: 'mdi mdi-account-circle',
          submenu: [
            
            
          ]
        }
      ];

      */

      if(ROLE ==='ADMIN_ROLE'){
           var menu = [
            {
                titulo: 'Mis Clientes',
                icono: 'mdi mdi-account-circle',
                submenu: [
                  
                    { titulo: 'Clientes', url: '/clientes' },
                    {titulo : 'Seguimiento de clientes'  , url: '/seguimiento'}
                ]
              },
              {
                titulo: 'Visitas GYM',
                icono: 'fa fa-calendar',
                submenu: [
                  
                    { titulo: 'Registrar visita', url: '/hco_visitas' },
                    {titulo : 'Historico visitas'  , url: '/historico'}
                ]
              },
              {
                titulo: 'Dietas',
                icono: 'fa fa-apple',
                submenu: [
                  
                    { titulo: 'Dietas', url: '/dietas' },
                ]
              },
              {
                titulo: 'Rutinas',
                icono: 'mdi mdi-bike',
                submenu: [
                  
                    { titulo: 'rutinas', url: '/rutinas' },
                ]
              },{
                titulo: 'Instrcutores',
                icono: 'mdi mdi-user',
                submenu: [
                  
                    { titulo: 'instructores', url: '/instructores' },
                ]
              },

           ];
           // menu[5].submenu.unshift({ titulo: 'Clientes', url: '/clientes' });
      }
      else if(ROLE === 'USER_ROLE'){
            var menu = [
                {
                    titulo: 'Principal',
                    icono: 'mdi mdi-gauge',
                    submenu: [
                      { titulo: 'Inicio', url: '/dashboard' }
                    ]
                  },
                  {
                    titulo: 'Cuotas',
                    icono: 'mdi mdi-wallet-membership',
                    submenu: [
                      { titulo: 'Informacion de cuotas', url: '/infoCuotas' },
                     
                    ]
                  },
                  {
                    titulo: 'Servicios',
                    icono: 'mdi mdi-library-books',
                    submenu: [
                      { titulo : 'Mis Dietas', url: '/Dietas' },
                      { titulo: 'Mis rutinas', url: '/Rutinas' }
                    ]
                  },
                  {
                    titulo: 'Info. General',
                    icono: 'mdi mdi-information-variant',
                    submenu: [
                      { titulo: 'Instructores y clases', url: '/Instructores' },
                           ]
                  }
            ];
      }

    return menu;
}


module.exports=app;