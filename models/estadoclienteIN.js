var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var estadoclienteINSchema =	new Schema({
                peso: {	type: String	},
                IMC: {	type: String	},
                estatura: {	type: String	},
                pecho: {	type: String	},
                brazo: {	type: String	},
                cintura: {	type: String	},
                gluteo: {	type: String	},
                muslo: {	type: String	},
                fecha : {type:String},
                img: {	type: String,	required: false },
                usuario:{ type: Schema.Types.ObjectId,ref:'Usuario'}
},	{	collection: 'estadoclienteIN' });
module.exports =	mongoose.model('estadoclienteIN',	estadoclienteINSchema);