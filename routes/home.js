exports.register = function register(app, base) {
	app.get(base + "", function(req, res) {
		res.render('home/index', {
			name : 'dan'
		});
	});
};