(function () {
	// Base URI for Web service
	var yqlEndpoint = "http://query.yahooapis.com/v1/yql";

	//Create a YQL query that CSV file to JSON
	var yqlQuery = 'select * from csv where url=';

	var csvURL = '"https://www.quandl.com/api/v1/datasets/WIKI/AAPL.csv?auth_token=HWxsDbuyfaaxHtq4wLUi"';

	// Create a variable to make results available
	// in the global namespace
	var yqlResults = "";

	// Callback function for handling response data
	function handler(rsp) {
		if(rsp.data){
			yql_results = rsp.data;
		}
	}

	// This utility function creates the query string
	// to be appended to the base URI of the YQL Web
	// service.
	function toQueryString(obj) {
		var parts = [];
		for(var each in obj) if (obj.hasOwnProperty(each)) {
			parts.push(encodeURIComponent(each) + '=' + encodeURIComponent(obj[each]));
		}
		return parts.join('&');
	};

	$.post(yqlEndpoint, encodeURIComponent(yqlQuery) + csvURL, handler, 'json');

	console.log(yqlResults);
}());
