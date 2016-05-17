var main = function(){
  //when button is clicked build the stock price history chart
  $('#search .btn').click( function() {
    var query = $( '#company-search' ).val();
    console.log(query);
    $('#welcome').collapse('hide');
    $('#welcome').on('hidden.bs.collapse', function() {
      $('#search label').text('');
      $('#screen').removeClass('vertically-center');
      $('#search').after('<div class="row top-buffer" id="results"></div>');
      $('#results').append('<div class="col-md-4 stock_history" id="stock_history"><h3>Stock History</h3><div></div></div>').append('<div class="col-md-4 stock_price" id="stock_price"><h3>Stock Price</h3><div></div></div>').append('<div class="col-md-4 stock_fundamentals" id="stock_fundamentals"><h3>Company Fundamentals</h3><div><table class="table table-hover"><tr><th>Current Ratio</th><td>1.11</td><th>Quick Ratio</th><td>1.08</td><th>Profit Margin</th><td>0.23</td></tr></div></div>');
    });
    var companyInfo = buildDashboard(query);
    console.log(companyInfo);
  });
};
main();
