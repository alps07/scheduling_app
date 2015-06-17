var docApps = require('./../server/controllers/docApps.js');

console.log("routes");

module.exports = function(app) {
    //customers controller calls
    app.get('/docApps', function(req, res) {
    console.log("req");
      docApps.read(req, res);
    });

    app.post('/docApps', function(req, res){
         console.log("req");
        docApps.add(req, res);
    })
}