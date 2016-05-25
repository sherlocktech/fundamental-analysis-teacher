/*
    Builds stock price section of Dashboard based on given price object.
*/
var buildPrice = function(priceObj) {
  $('#results .stock_price div').html(
    '<ul class="bulletlessList">' +
      '<li>Open: ' + priceObj.open + '</li>' +
      '<li>High: ' + priceObj.high + '</li>' +
      '<li>Low: ' + priceObj.low + '</li>' +
      '<li>Close: ' + priceObj.close + '</li>' +
    '</ul>');
}
