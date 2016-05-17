/*
    Builds stock history c3 chart based on what company was searched given as
    company, a string representing the stock ticker of the company, and the
    current time given as date, a date object.
*/
var buildStockHistoryChart = function( timeseries ) {
  var date  = timeseries.date;
  var price = timeseries.price;

  var chart = c3.generate({
      bindto: '#stock_history div',
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
};
