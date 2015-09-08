(function () {
	"use strict";

	var express = require('express'),
		sql = require('sql'),
		app = express();

	//define sql tables
	var stock = sql.define({
		name: 'stock',
		columns: ['tickSym', 'name']
	});
	var price = sql.define({
		name: 'price',
		columns: ['tickSym', 'openPrice', 'closePrice']
	});

} ());
