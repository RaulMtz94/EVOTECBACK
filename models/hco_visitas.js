var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var hco_visitasSchema =	new Schema({
            nombre: {	type: String	},
            fecha: {	type: String	},
            socio: {	type: Boolean	},
            monto: {	type: String	},
            correo: {	type: String	},
            usuario:{ type: Schema.Types.ObjectId,ref:'Usuario' , required:false}
},	{	collection: 'hco_visitas' });
module.exports =	mongoose.model('hco_visitas',	hco_visitasSchema); 