var mongoose = require('mongoose');
var DocAppn = mongoose.model('DocAppn');
console.log("docApp contr");
module.exports = (function(){
	return {
		read: function(req, res){
			console.log("read mtd");
			DocAppn.find({}, function(err, result){
				if(err){
					console.log(err);
				}else{
					res.json(result);
				}
			})
		},

		add: function(req, res){
			console.log(req.body);
			var docApp = new DocAppn(req.body);
			docApp.save(function(err){
				if(err){
					console.log(err);
					res.json({error: err});
				}else
				{
					console.log("successfully inserted!");
					res.json({resdata: "success"});
				}
			})
		}
	}
})();