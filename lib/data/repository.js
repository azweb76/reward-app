var db = require("../util/db");
var qs = require('querystring');

function readPost(req, cb){
	var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var POST = qs.parse(body);
        cb(null, POST);
    });
}

exports.mapRest = function mapRest(table, app, route){
	console.log("mapping rest " + route + " to " + table);
	app.get(route, function(req, res) {
		db.select(table, function(err, data){
			res.json(data);
		});
	});
	
	app.get(route + ":id", function(req, res) {
		var filter = { id: req.params.id };
		if (req.params.id == 'find'){
			filter = req.query;
		}
		db.selectBy(table, filter, function(err, data){
			res.json(data);
		});
	});
	
	app.post(route, function(req, res) {
        readPost(req, function (err, POST) {
            db.insert(table, POST, function(err, id){
            	if (err) return res.json ({ error: err });
    			res.json(id);
    		});
        });
	});
	
	app.put(route + ":id/edit", function(req, res) {
		readPost(req, function (err, params) {
            db.update(table, req.params.id, params, function(err, id){
            	if (err) return res.json ({ error: err });
    			res.json(id);
    		});
        });
	});
	
	app.delete(route + ":id/delete", function(req, res) {
			
		db.delete(table, req.params.id, function(err, result){
	    	if (err) return res.json ({ error: err });
			res.json(result);
		});
		
	});
};