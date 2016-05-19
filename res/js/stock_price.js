/*
    Builds stock price section of Dashboard based on given price object.
*/
var buildPrice = function(priceObj) {
  $('#stock_history').after('<div class="col-md-4 stock_price" id="stock_price"><h3>Stock Price</h3><div></div></div>');
  $('#stock_price div').html(
    '<ul class="bulletlessList">' +
      '<li>Open: ' + priceObj.open + '</li>' +
      '<li>High: ' + priceObj.high + '</li>' +
      '<li>Low: ' + priceObj.low + '</li>' +
      '<li>Close: ' + priceObj.close + '</li>' +
    '</ul>');
}
