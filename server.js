(function () {
	"use strict";
	//app variables
	var express = require('express'),
		  mysql = require('mysql'),
			https = require('https'),
		  app = express();

	app.use(express.static(__dirname));

	//query variables
	var query = '',
		  quandlURI = 'https://www.quandl.com/api/v3/datasets/',
			fundamentalsCode = 'SEC/',
			priceCode = 'WIKI/',
			companyName = '',
			AAPL_DIV = 'SEC/DIV_AAPL.json',
			AAPL_ASSETS = 'SEC/AAPL_ASSETSCURRENT_A.json',
			AAPL_LIABILITIES = 'SEC/AAPL_LIABILITIESCURRENT_A.json',
			apiKey = '?api_key=NxE-gV7J35m1xs-TEsrq';

	//connect node mysql to mysql server
	//info required is stored in object
	/*var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'sherlocktech',
		password : 'ssta8767',
		database : 'fat'
	});
	connection.connect();*/

	var server = app.listen(3000, function() {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Server listening at http://%s:%s', host, port);
	});

	var r;

	app.get('/', function (req, res) {
		res.send(r);
	});

	//request AAPL current assest (annual)
	console.log('Requesting AAPL current assest (annual)');
	query = quandlURI + AAPL_ASSETS + apiKey;
	var assetReq = https.get(query, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			console.log('BODY: ' + body);
			// ...and/or process the entire body here.
		})
	});
	assetReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

	//request AAPL current liabilities (annual)
	console.log('Requesting AAPL current liabilties (annual)');
	query = quandlURI + AAPL_LIABILITIES + apiKey;
	var liabilityReq = https.get(query, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			console.log('BODY: ' + body);
			// ...and/or process the entire body here.
		})
	});
	liabilityReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

} ());
