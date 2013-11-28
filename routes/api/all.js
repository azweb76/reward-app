var repo = require("../../lib/data/repository");

exports.register = function register(app, base) {
	repo.mapRest("users", app, base + "users/");
};