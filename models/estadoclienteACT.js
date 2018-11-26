var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var estadoclienteACTSchema =	new Schema({
            peso: {	type: String	},
            IMC: {	type: String	},
            estatura: {	type: String	},
            pecho: {	type: String	},
            brazo: {	type: String	},
            cintura: {	type: String	},
            gluteo: {	type: String	},
            muslo: {	type: String	},
            img: {	type: String,	required: false },
            usuario:{ type: Schema.Types.ObjectId,ref:'Usuario' , required:true}
},	{	collection: 'estadoclienteACT' });
module.exports =	mongoose.model('estadoclienteACT',	estadoclienteACTSchema);