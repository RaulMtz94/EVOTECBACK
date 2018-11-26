var express = require('express');
var app = express();
var dietas = require ('../models/dietas');
var cliente = require ('../models/cliente');



//Rutas
app.get('/', (req , res , next) =>{
    res.status(200).json({
        ok : true ,
        mensaje : 'Peticion Realizada Correctamente'
    });
});

//==============================================
//Crear una nueva dieta
//==============================================
app.post ('/',(req , res) => {
    var body  = req.body;
    var sumaCalorias;
    sumaCalorias = parseFloat(body.caloriasL) + parseFloat(body.caloriasM) +parseFloat(body.caloriasMI) +parseFloat(body.caloriasJ) + parseFloat(body.caloriasL) + parseFloat(body.caloriasS) + parseFloat(body.caloriasD);
    //instancia de las dietas 
    var dieta = new dietas({
        dias : {
            lunes : {
                calorias : body.caloriasL,
                carbohidratos : body.carbohidratosL,
                proteinas : body.caloriasL,
                grasas : body.grasasL
            },
            martes : {
                calorias : body.caloriasM,
                carbohidratos : body.carbohidratosM,
                proteinas : body.caloriasM,
                grasas : body.grasasM
            },
            miercoles : {
                calorias : body.caloriasMI,
                carbohidratos : body.carbohidratosMI,
                proteinas : body.proteinasMI , 
                grasas : body.grasasMI
            },
            jueves : {
                calorias : body.caloriasJ,
                carbohidratos : body.carbohidratosJ,
                proteinas : body.proteinasJ , 
                grasas : body.grasasJ
            } ,
            viernes : {
                calorias : body.caloriasV,
                carbohidratos : body.carbohidratosV,
                proteinas : body.proteinasV, 
                grasas : body.grasasV
             } ,
            sabado : {
                calorias : body.caloriasS,
                carbohidratos : body.carbohidratosS,
                proteinas : body.proteinasS , 
                grasas : body.grasasS
            } ,
            domingo : {
                calorias : body.caloriasD,
                carbohidratos : body.carbohidratosD,
                proteinas : body.proteinasD, 
                grasas : body.grasasD
            }
        },
        nombre : body.nombre,
        descripcion : body.descripcion ,
        tiempo : body.tiempo ,
        caloriasTotales : sumaCalorias,
        estatus:true

    });
    

    dieta.save( (err , dietas) =>{
        if (err) {
            return res.status(400).json({
                 ok : false ,
                 mensaje : 'Error al guardar la dieta',
                 errors: err
             });
         }
        
            res.status(201).json({
                ok : true ,
                mensaje : 'La dieta se guardo correctamente',
                historico:dietas
            });
                  
    });  
});

//==============================================
//Actualizar Dieta
//==============================================
app.put ('/actualizarDieta/:id',(req , res) => {
    var body  = req.body;
    var id = req.params.id;
    var sumaCalorias;
    sumaCalorias = parseFloat(body.dias.lunes.calorias) + parseFloat(body.dias.martes.calorias) +parseFloat(body.dias.miercoles.calorias) +parseFloat(body.dias.jueves.calorias) + parseFloat(body.dias.viernes.calorias) + parseFloat(body.dias.sabado.calorias) + parseFloat(body.dias.domingo.calorias);
   
  
   
    
    dietas.findOne({_id:id} , (err , state)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
        
         state.dias.lunes.calorias = body.dias.lunes.calorias;
         state.dias.lunes.carbohidratos = body.dias.lunes.carbohidratos;
         state.dias.lunes.proteinas = body.dias.lunes.proteinas;
         state.dias.lunes.grasas = body.dias.lunes.grasas;

         state.dias.martes.calorias = body.dias.martes.calorias;
         state.dias.martes.carbohidratos = body.dias.martes.carbohidratos;
         state.dias.martes.proteinas = body.dias.martes.proteinas;
         state.dias.martes.grasas = body.dias.martes.grasas;

         state.dias.miercoles.calorias = body.dias.miercoles.calorias;
         state.dias.miercoles.carbohidratos = body.dias.miercoles.carbohidratos;
         state.dias.miercoles.proteinas = body.dias.miercoles.proteinas;
         state.dias.miercoles.grasas = body.dias.miercoles.grasas;

         state.dias.jueves.calorias = body.dias.jueves.calorias;
         state.dias.jueves.carbohidratos = body.dias.jueves.carbohidratos;
         state.dias.jueves.proteinas = body.dias.jueves.proteinas;
         state.dias.jueves.grasas = body.dias.jueves.grasas;

         state.dias.viernes.calorias = body.dias.viernes.calorias;
         state.dias.viernes.carbohidratos = body.dias.viernes.carbohidratos;
         state.dias.viernes.proteinas = body.dias.viernes.proteinas;
         state.dias.viernes.grasas = body.dias.viernes.grasas;

         state.dias.sabado.calorias = body.dias.sabado.calorias;
         state.dias.sabado.carbohidratos = body.dias.sabado.carbohidratos;
         state.dias.sabado.proteinas = body.dias.sabado.proteinas;
         state.dias.sabado.grasas = body.dias.sabado.grasas;

         state.dias.domingo.calorias = body.dias.domingo.calorias;
         state.dias.domingo.carbohidratos = body.dias.domingo.carbohidratos;
         state.dias.domingo.proteinas = body.dias.domingo.proteinas;
         state.dias.domingo.grasas = body.dias.domingo.grasas;

         state.nombre = body.nombre;
         state.descripcion = body.descripcion;
         state.tiempo = body.tiempo;
        state.caloriasTotales = sumaCalorias;

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
//==============================================
//Baja dieta
//==============================================
app.put ('/bajaDieta/:id',(req , res) => {
    var id = req.params.id;
   
    dietas.findOne({_id:id} , (err , state)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
        
         
         state.estatus = false;
    

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
//==============================================
//Reactivar dieta
//==============================================
app.put ('/altaDieta/:id',(req , res) => {
    var id = req.params.id;
   
    dietas.findOne({_id:id} , (err , state)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
        
         
         state.estatus = true;
    

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
//==============================================
//asignar dieta
//==============================================
app.put ('/asignarDieta/:idcliente/:iddieta',(req , res) => {
    var idcliente = req.params.idcliente;
    var iddieta = req.params.iddieta;
   
    cliente.findOne({_id:idcliente} , (err , state)=>{
        if (err) {
            return res.status(500).json({
                 ok : false ,
                 mensaje : 'Error al buscar usuario',
                 errors: err
             });
         }
        
         state.dieta = iddieta;
         
    

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
//BUSCAR DIETA DEL CLIENTE
app.get('/dietaCliente/:id', (req , res , next) =>{
    var idrutina = req.params.id;
    dietas.find({ _id : idrutina } )
        
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