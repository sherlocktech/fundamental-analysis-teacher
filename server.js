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
        AAPL_INVENTORY = 'SEC/AAPL_INVENTORYNET_A.json',
        AAPL_NETSALES = 'SEC/AAPL_SALESREVENUENET_A.json',
        apiKey = '?api_key=NxE-gV7J35m1xs-TEsrq';

    var serverResponse = {
        "company" : "Apple Inc.",
        "ratios" : [
            { "ratio" : "Current Ratio", "value" : null, "definition" : "current assets / current liabilities", "description" : "The higher the ratio, the greater the likelihood the company will be able to pay its bills. The value of this ratio should be greater than 1; many analysts consider values under 2 reason for concern."},
            { "ratio" : "Quick Ratio", "value" : null, "definition" : "quick assets / current liabilities", "description" : "The higher the ratio the better (though the quick ratio will always be lower than the current ratio)."}/*,
            { "ratio" : "Asset Turnover", "value" : null, "definition" : "net sales / average total assets", "description" : "Typical values vary by industry, ranging from about 1 in industries whose production is capital intensive (e.g., steel and autos) to over 10 in some types of retailing."},
            { "ratio" : "Inventory Turnover", "value" : null, "definition" : "cost of goods sold / average inventory", "description" : "TA higher ratio suggests that, on average, its goods are moving quickly; a lower ratio suggests that the firm may be saddled with obsolete inventory or is having trouble selling its product. While higher values are generally consistent with greater efficiency, they can result from having too little inventory to support the company’s current sales volume, which could lead to shortages, back orders and lost sales."}*/
        ]
    };

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

	//request AAPL current assest (annual)
    var currentAnnualAssets;
    var assetDone = false;
	console.log('Requesting AAPL current assest (annual)');
	query = quandlURI + AAPL_ASSETS + apiKey;
	var assetReq = https.get(query, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var body = '';
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			body += chunk;
		}).on('end', function() {
			var json = JSON.parse(body);
            currentAnnualAssets = json.dataset.data[0];
			console.log('/nASSETS DATA: ' + json.dataset.data);
			// ...and/or process the entire body here.
            assetDone = true;
		})
	});
	assetReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
        assetDone = false;
	});

	//request AAPL current liabilities (annual)
    var currentAnnualLiabilities;
    var liabilityDone = false;
	query = quandlURI + AAPL_LIABILITIES + apiKey;
	var liabilityReq = https.get(query, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var body = '';
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			body += chunk;
		}).on('end', function() {
			var json = JSON.parse(body);
            currentAnnualLiabilities = json.dataset.data[0];
			console.log('/nLIABILITIES BODY: ' + json.dataset.data[0]);
			// ...and/or process the entire body here.
            liabilityDone = true;
		})
	});
	liabilityReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
        liabilityDone = false;
	});

    //request AAPL inventory (annual)
    var annualInventory;
    var inventoryDone = false;
	query = quandlURI + AAPL_INVENTORY + apiKey;
	var inventoryReq = https.get(query, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var body = '';
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			body += chunk;
		}).on('end', function() {
			var json = JSON.parse(body);
            annualInventory = json.dataset.data[0];
			console.log('/nINVENTORY BODY: ' + json.dataset.data[0]);
			// ...and/or process the entire body here.
            inventoryDone = true;
		})
	});
	inventoryReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
        inventoryDone = false;
	});
    /*
    //request AAPL inventory (annual)
    var annualNetSales;
    var netSalesDone = false;
	query = quandlURI + AAPL_NETSALES + apiKey;
	var netSalesReq = https.get(query, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var body = '';
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			body += chunk;
		}).on('end', function() {
			var json = JSON.parse(body);
            annualNetSales = json.dataset.data[0];
			console.log('/nNET SALES BODY: ' + json.dataset.data[0]);
			// ...and/or process the entire body here.
            netSalesDone = true;
		})
	});
	netSalesReq.on('error', function(e) {
		console.log('ERROR: ' + e.message);
        netSalesDone = false;
	});
    */
    if (assetDone && inventoryDone && liabilityDone) {
        serverResponse.ratios[0].value = currentAnnualAssets/currentAnnualLiabilities;
        serverResponse.ratios[1].value = (currentAnnualAssets - annualInventory)/currentAnnualLiabilities;
        console.log('SERVER RESPONSE: ' + JSON.stringify(serverResponse));
    }

	app.get('/data', function (req, res) {
		//res.send(serverResponse);
        res.sendFile(__dirname + '/data.html');
	});
} ());
