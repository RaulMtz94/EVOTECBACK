var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var rutinasSchema =	new Schema({
   lunes : {type: Map,of: String},
   martes : {type: Map,of: String},
   miercoles : {type: Map,of: String},
   jueves : {type: Map,of: String},
   viernes : {type: Map,of: String},
   sabado : {type: Map,of: String},
   domingo : {type: Map,of: String},
   nombre : {type:Map , of: String}
   
},	{	collection: 'rutinas' });
module.exports =	mongoose.model('rutinas',	rutinasSchema);