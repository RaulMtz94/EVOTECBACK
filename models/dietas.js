var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var dietaSchema =	new Schema({
                dias : {
                    lunes : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                    },
                    martes : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                    } ,
                    miercoles : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                    } ,
                    jueves : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                    } ,
                    viernes : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                     } ,
                    sabado : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                    } ,
                    domingo : {
                        calorias : {type : String , required : false},
                        carbohidratos : {type : String , required : false},
                        proteinas : { type : String , required : false } , 
                        grasas : {type : String , required : false}
                    }
                },
                nombre: {	type: String,	required: false	},
                descripcion : { type : String , required : false},
                tiempo : {type : String , required : false },
                caloriasTotales :{ type : String , required : false},
                estatus:{type : Boolean , required : false}
},	{	collection: 'dietas' });
dietaSchema.plugin( uniqueValidator , {message : '{PATH} debe de ser unico'});
module.exports =	mongoose.model('Dieta',	dietaSchema);