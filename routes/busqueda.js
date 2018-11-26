var express = require('express');
var app = express();
var cliente = require('../models/cliente');
var hco_visitas = require('../models/hco_visitas');
var dietas = require('../models/dietas');
//Rutas
app.get('/todo/:busqueda', (req , res , next) =>{
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    cliente.find({nombre : regex} , (err , clientes)=>{
        res.status(200).json({
            ok : true ,
            mensaje : clientes
        });
    });   
});

//Busqueda por coleccion 
//-----------------------
app.get('/coleccion/:tabla/:busqueda?', (req , res ) =>{
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    var tabla = req.params.tabla;
    let promesa;
    

    switch(tabla){
        case 'clientes' :
            promesa = buscarClientes(busqueda , regex);
            break; 
        case 'hco_visitas':
            promesa = buscarVisitas(busqueda , regex);
            break;
        case 'dietas':
            if(busqueda){
                
                promesa = buscarDieta(busqueda , regex);
                break;
            }
            promesa = buscarDietas(busqueda ,  regex);
            break;
        default :
           return res.status(400).json({
                ok : false ,
                mensaje : 'Error no existe esa tabla'
            });
    }

    promesa.then(data =>{
        res.status(200).json({
            ok : true ,
            [tabla]:data
        });
    });

});

function buscarClientes(busqueda , regex){
    return new Promise((resolve , reject)=>{
        
        cliente.find({$or : [{nombre : regex} , {apellidoP : regex} , {apellidoM: regex} , {domicilio:regex} ] } , (err , clientes)=>{
            if(err){
                reject('Error al cargar clientes' , err);
            }else{
                resolve(clientes);
            }
        });   
    });
}
function buscarVisitas(busqueda,regex){
    return new Promise((resolve , reject)=>{
        
        hco_visitas.find({$or : [{nombre : regex} , {fecha : regex} , {correo: regex} ] } , (err , clientes)=>{
            if(err){
                reject('Error al cargar visitas' , err);
            }else{
                resolve(clientes);
            }
        });   
    });
}
//BUSQUEDA DE DIETAS
function buscarDietas(busqueda,regex){
    return new Promise((resolve , reject)=>{
        
        dietas.find({} , (err , dietas)=>{
            if(err){
                reject('Error al cargar visitas' , err);
            }else{
                resolve(dietas);
            }
        });   
    });
}
//BUSQUEDA DE DIETAS POR PARAMETROS
function buscarDieta(busqueda,regex){
    return new Promise((resolve , reject)=>{
        
        dietas.find({nombre : regex} , (err , dietas)=>{
            if(err){
                reject('Error al cargar dietas' , err);
            }else{
                resolve(dietas);
            }
        });   
    });
}

module.exports = app;