/*
    Builds stock history c3 chart based on what company was searched given as
    company, a string representing the stock ticker of the company, and the
    current time given as date, a date object.
*/
var buildStockHistoryChart = function( company ) {
  //potential dataset that will include price history
  var datasetCode = 'WIKI/' + company + '/';

  //search query to see if dataset exists
  var searchEndpoint = 'https://www.quandl.com/api/v3/datasets.json?';
  var quandlDatabase = 'database_code=WIKI';
  var datasetQuery = '&query=' + company + '&per_page=1&page=1';


  //get request to determine if dataset exists in quandlDatabase
  var searchSuccessful = true;
  var searchReq = $.getJSON(searchEndpoint + quandlDatabase + datasetQuery, function( result ) {
    if(result.datasets === undefined || result.datasets.length == 0){
      searchSuccessful = false;
    }
  });
  //once request completes check to see if searchSuccessful
  //if !searchSuccessful alert to user
  searchReq.done(function() {
    if(!searchSuccessful) {
      alert('Cannot find company...');
    }
    else {
      //compute startDate string for query
      var startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      var startDateString = startDate.toISOString().substring(0,10);
      //price history query from the month before now | without API key
      var query = 'https://www.quandl.com/api/v3/datasets/'
        + datasetCode +  'data.json?order=asc&start_date=' + startDateString;

      //get request from query, result is stored into simplified arrays
      //date and price data arrays
      var date = ['date'];
      var price = ['price'];
      var stockReq = $.getJSON(query, function( result ) {
        //on each array in the data arrar push the date and price to respective arrays
        $.each(result.dataset_data.data, function ( index, subarray ) {
          date.push(subarray[0]);
          price.push(subarray[4]);
        });
      });
      //once request finishes build c3 chart
      stockReq.done(function () {
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
    }
  });
};
