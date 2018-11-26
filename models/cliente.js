var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var clienteSchema =	new Schema({
                nombre: {	type: String,	required: false	},
                apellidoP: {	type: String,	required: false	},
                apellidoM: {	type: String	},
                domicilio: {	type: String	},
                telefono: {	type: String	},
                fechaAlta: {	type: Date,	required: false	},
                fechaVencimiento: {	type: Date,	required:false	},
                img: {	type: String,	required: false },
                estatus: {	type: Boolean	},
                usuario:{ type: Schema.Types.ObjectId,ref:'Usuario'},
                dieta:{type : Schema.Types.ObjectId , ref:'dietas' , required : false},
                rutina:{type : Schema.Types.ObjectId , ref:'rutinas' , required : false},

},	{	collection: 'Clientes' });
clienteSchema.plugin( uniqueValidator , {message : '{PATH} debe de ser unico'});
module.exports =	mongoose.model('Cliente',	clienteSchema);