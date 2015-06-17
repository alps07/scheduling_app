var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var complainValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 10],
    message: 'complain should be between 1 and 10 characters'
  }) 
];

var timeValidator = [
  validate({
    validator: function(val) {
    	var vale = Date.parse(val);
    	var d = new Date("1970-01-01T08:00:00Z");
    	var t = d.getTime();
	    var start_t = Date.parse("1970-01-01T08:00:00Z");
	    var end_t = Date.parse("1970-01-01T05:00:00Z");    
    	if (vale < start_t)
    		return vale < start_t
    	 else if(vale > end_t)
    	 	return vale > end_t;
  	},
    message: 'time should be between 8 am and 5 pm'
  }) 
];

var dateValidator = [
	 validate({
	    validator: function(val) {
	    	var vale = Date.parse(val);
	    	var now = new Date();
		    var now_t = Date.parse(now); 
	    	return vale < now_t ;
	  	},
	    message: 'Only future Date is allowed!'
  }) 
];

var DocAppnSchema = new mongoose.Schema({
	p_name : String,
	date:{ type: Date, default: Date.now, required:true },
	time:{type: Date, required:true, validate: timeValidator },
	complain: { type:String, validate: complainValidator}
});

DocAppnSchema.path('date').required(true, 'date cannot be blanked');
 DocAppnSchema.path('complain').required(true, 'complain cannot be blanked');
DocAppnSchema.path('time').required(true, 'time cannot be blanked');

mongoose.model('DocAppn', DocAppnSchema);