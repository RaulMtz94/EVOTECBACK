var express = require('express');
var app = express();
var Rutina = require ('../models/rutinas');
var cliente = require ('../models/cliente');


//Rutas
app.get('/', (req , res , next) =>{
    Rutina.find({  } )
        
        .exec(
         (err, clientes) => {
        if (err) {
           return res.status(500).json({
                ok : false ,
                mensaje : 'Error cargando clientes',
                errors: err
            });
        }
        Rutina.count({} , (err , conteo)=>{
            res.status(200).json({
                ok : true ,
                mensaje : 'Clientes',
                rutinas : clientes,
                total:conteo
            });
        });
       
    })
});

//==============================================
//Crear una rutina
//==============================================
app.post ('/',(req , res) => {
    var R = new Rutina({
        lunes :[],
        martes :[],
        miercoles :[],
        jueves :[],
        viernes :[],
        sabado :[],
        domingo :[],
        nombre : []
    });
   
    var body  = req.body;
    R.nombre.set('Nombre',body.nombre);
    for (key in body){
        if(key === 'lunes'){
           //console.log(body[key][0]);
           for (value in body[key]) {
            
             R.lunes.set(body[key][value].ejercicios , body[key][value].repeticiones); 
           }
        }
        else if(key === 'martes'){
            for (value in body[key]) {
                R.martes.set(body[key][value].ejercicios , body[key][value].repeticiones);
              }
        }
        else if(key === 'miercoles'){
            for (value in body[key]) {
                R.miercoles.set(body[key][value].ejercicios , body[key][value].repeticiones);
              }
        }
        else if(key === 'jueves'){
            for (value in body[key]) {
                R.jueves.set(body[key][value].ejercicios , body[key][value].repeticiones);
              }
        }
        else if(key === 'viernes'){
            for (value in body[key]) {
                R.viernes.set(body[key][value].ejercicios , body[key][value].repeticiones);
              }
        }
        else if(key === 'sabado'){
            for (value in body[key]) {
                R.sabado.set(body[key][value].ejercicios , body[key][value].repeticiones);
              }
        }
        else if(key === 'domingo'){
            for (value in body[key]) {
                R.domingo.set(body[key][value].ejercicios , body[key][value].repeticiones);
              }
        }
        
        
        
    }
   
    //R.lunes.set(body.lunes[0].Nombre , body.lunes[0].Reps);
    //R.lunes.set(body.lunes[1].Nombre , body.lunes[1].Reps);
    //console.log(R);
   
    

    R.save( (err , rutinas) =>{
        if (err) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Error al guardar la rutina',
                 errors: err
             });
         }
        
            res.status(201).json({
                ok : true ,
                mensaje : 'La rutina se guardo correctamente'
            });
                  
    });  

});
//==============================================
//asignar rutina
//==============================================
app.put ('/asignarRutina/:idcliente/:idrutina',(req , res) => {
    var idcliente = req.params.idcliente;
    var idrutina = req.params.idrutina;
   
    cliente.findOne({_id:idcliente} , (err , state)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
        
         state.rutina = idrutina;
         
    

        state.save( (err , clienteGuardado) =>{
            if (err) {
                return res.status(400).json({
                     ok : false ,
                     mensaje : 'Se guardo correctamente la dieta',
                     errors: err
                 });
             }
             res.status(201).json({
                ok : true ,
                 cliente:clienteGuardado 
            });
        }); 
     
       
    });
});

//BUSCAR RUTINA POR ID DEL CLIENTE
app.get('/rutinaCliente/:id', (req , res , next) =>{
    var idrutina = req.params.id;
    Rutina.find({ _id : idrutina } )
        
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
                ok : true ,
                mensaje : 'Clientes',
                rutina : clientes
            });
      
       
    })
});


module.exports = app;