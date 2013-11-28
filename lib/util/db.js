var mysql      = require('mysql');

function getConnection(){
	return mysql.createConnection({
		  host     : 'azwebmaster.cloudapp.net',
		  user     : 'newuser',
		  password : '1234',
		  database: 'rewardapp'
		});
};

exports.select = function select(table, cb){
	var sql = "select * from " + table;
	
	var connection = getConnection();
	
	connection.connect(function(err) {
		if (err) return cb(err);
		connection.query(sql, function(err, rows, fields) {
		  if (err) cb(err);
		  connection.end();
		  cb(null, rows);
		});
	});
};

exports.selectBy = function selectById(table, filter, cb){
	var sql = "select * from " + table + " where ?"
	
	console.log(sql, filter);
	var connection = getConnection();
	
	connection.connect(function(err) {
		if (err) return cb(err);
		connection.query(sql, [filter], function(err, rows, fields) {
		  if (err) cb(err);
		  connection.end();
		  cb(null, rows);
		});
	});
};

exports.insert = function insert(table, params, cb){
	var connection = getConnection();
	
	connection.connect(function(err) {
		if (err) return cb(err);
		var sql = "insert into " + table + " set ?";

		console.log("db:insert", sql, params);
		connection.query(sql, params, function(err, result) {
		  if (err) cb(err);
		  connection.end();
		  cb(null, result);
		});
	});
};

exports.update = function update(table, id, params, cb){
	var connection = getConnection();
	
	connection.connect(function(err) {
		if (err) return cb(err);
		var sql = "update " + table + " set ? where id = ?";

		console.log("db:update", sql);
		connection.query(sql, [params, id], function(err, result) {
		  if (err) cb(err);
		  connection.end();
		  cb(null, result);
		});
	});
};

exports["delete"] = function (table, id, cb){
	var connection = getConnection();
	
	connection.connect(function(err) {
		if (err) return cb(err);
		var sql = "delete from " + table + " where id = ?";

		console.log("db:delete", sql);
		connection.query(sql, [id], function(err, result) {
		  if (err) cb(err);
		  connection.end();
		  cb(null, result);
		});
	});
};