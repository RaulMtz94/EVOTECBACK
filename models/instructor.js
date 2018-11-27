var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var instructorSchema =	new Schema({
                nombre: {	type: String,	required: false	},
                estudios: {	type: String,	required: false	},
                horario: {	type: String	},
                fechaAlta: {	type: Date,	required: false	},
                img: {	type: String,	required: false },
                estatus: {	type: Boolean	}

},	{	collection: 'Instructor' });
instructorSchema.plugin( uniqueValidator , {message : '{PATH} debe de ser unico'});
module.exports =	mongoose.model('Instructor',	instructorSchema);