(function () {
	var query = '';
	$(".submitForm button").click(function() {
		//build query string
		query = $("#tickerSymbol").val();
		//get request from express server possibly via angular
	});
}());
