//define app
var main = function(){
  //when button is clicked build the stock price history chart
  $('#search .btn').click( function() {
    var query = $( '#company-search' ).val();
    var companyInfo = getQuandlInfo(query);
    buildStockHistoryChart(companyInfo.timeseries);
    buildPrice(companyInfo.price);
    //buildFundamentalsTable(companyInfo.fundamentals);
    console.log(companyInfo);
  });
};

//run app
main();
