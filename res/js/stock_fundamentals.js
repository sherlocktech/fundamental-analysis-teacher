/*
    Builds company fundamentals section of Dashboard based on given
    fundamentals object.
*/
var buildFundamentalsTable = function (fundamentals) {
  $('#stock_price').after('<div class="col-md-4 stock_fundamentals" id="stock_fundamentals"><h3>Company Fundamentals</h3><div><table class="table table-hover"><tr><th>Current Ratio</th><td>1.11</td><th>Quick Ratio</th><td>1.08</td><th>Profit Margin</th><td>0.23</td></tr></div></div>');
}
