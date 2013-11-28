var express = require('express');
var app = express();
var routes = require("./routes/all");
var doT = require("express-dot");

doT.templateSettings = {
	evaluate : /\{\{([\s\S]+?)\}\}/g,
	interpolate : /\{\{=([\s\S]+?)\}\}/g,
	encode : /\{\{!([\s\S]+?)\}\}/g,
	use : /\{\{#([\s\S]+?)\}\}/g,
	define : /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
	conditional : /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
	iterate : /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
	varname : 'it',
	strip : true,
	append : true,
	selfcontained : false
};

require("dot").process({
	path : __dirname + "/views"
});

app.configure(function() {
	// set views folder
	app.use(express.favicon());
	app.set('views', __dirname + '/views');
	app.use(express.static('assets'));

	// doT engine
	app.set('view engine', 'dot');
	app.engine('dot', doT.__express);
});

routes.register(app);

var port = process.env.PORT || 80;
app.listen(port);

console.log("Listening on port " + port);