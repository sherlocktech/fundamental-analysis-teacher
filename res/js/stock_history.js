/*
    Builds stock history section of Dashboard based on given timeseries object
    with date and price properties.
*/
var buildStockHistoryChart = function( timeseries ) {
  $('#results').append('<div class="col-md-4 stock_history"><h3>Stock History</h3><div></div></div>');
  var date  = timeseries.date;
  var price = timeseries.price;

  var chart = c3.generate({
      bindto: '#results .stock_history div',
      data: {
        x: 'date',
        columns: [
          date,
          price
        ]
      },
      axis: {
        x: {
          text: 'Date',
          type: 'timeseries'
        },
        y:'Closing Price'
      }
  });
  return $('#results stock_history');
};
