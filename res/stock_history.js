var query =  "https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json?order=asc&start_date=2015-05-01&end_date=2015-05-31"; //for the month of May in 2015 | without key
var date = ['date'];
var price = ['price'];

//get request from query, result is stored into simplified arrays
var jsonReq = $.getJSON(query, function( result ) {
  //on each array in the data arrar push the date and price to respective arrays
  $.each(result.dataset_data.data, function ( index, subarray ) {
    date.push(subarray[0]);
    price.push(subarray[4]);
  });
});
//once request finishes build c3 chart
jsonReq.done(function () {
  var chart = c3.generate({
      bindto: '#stock_history',
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
});
