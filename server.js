(function () {
	"use strict";

	var express = require('express'),
		mysql = require('mysql'),
		yql = require('yql-node'),
		app = express();

	app.use(express.static(__dirname));

	//connect node mysql to mysql server
	//info required is stored in object
	/*var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'sherlocktech',
		password : 'ssta8767',
		database : 'FAT'
	});
	connection.connect();*/

	var server = app.listen(3000, function() {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Server listening at http://%s:%s', host, port);
	});

	//use YQL to return JSON from a csv on Quandl
	//prints JSON to console
	var yqueryAAPL = 'select * from csv where url="https://www.quandl.com/api/v1/datasets/WIKI/AAPL.csv?auth_token=HWxsDbuyfaaxHtq4wLUi"';
	yql.execute(yqueryAAPL, function(err, response) {
		if(!err){
			console.log(response);
		} else {
			console.error(err);
		}
	});
} ());
