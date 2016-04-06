//define app
var main = function(){
  //create date object as current time, based on client system clock
  var currentTime = new Date();
  //when button is clicked build the stock price history chart
  $('#search .btn').click( function() {
    var query = $( '#company-search' ).val();
    buildStockHistoryChart( query, currentTime );
    //fillFundamentalsTable( query, currentTime );
  });
};

//run app
main();
