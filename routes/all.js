exports.register = function(app){
	require("./home").register(app, "/");
	require("./api/all").register(app, "/api/");
}