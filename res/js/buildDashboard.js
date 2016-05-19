var buildDashboard = function(company) {
  //hide welcome description
  $('#welcome').collapse('hide');
  //move search bar to top and add results div
  $('#welcome').on('hidden.bs.collapse', function() {
    $('#search label').text('');
    $('#screen').removeClass('vertically-center');
    $('#search').after('<div class="row top-buffer" id="results"></div>');
  });

  //object to return
  var timeseries = new Timeseries();
  var price = new Price();
  var fundamentals = new Fundamentals();
  var companyInfo = new CompanyInfo(timeseries, price, fundamentals);

  //potential dataset that will include price history
  var datasetCode = 'WIKI/' + company + '/';

  //search query to see if dataset exists
  var searchEndpoint = 'https://www.quandl.com/api/v3/datasets.json?';
  var quandlDatabase = 'database_code=WIKI';
  var datasetQuery = '&query=' + company + '&per_page=1&page=1';


  //get request to determine if dataset exists in quandlDatabase
  var searchSuccessful = true;
  var stockRequestQuery = searchEndpoint + quandlDatabase + datasetQuery;
  var searchReq = $.getJSON(stockRequestQuery, function( result ) {
    if(result.datasets === undefined || result.datasets.length == 0){
      searchSuccessful = false;
    }
  });
  //once request completes check to see if searchSuccessful
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
      var stockReq = $.getJSON(query, function( result ) {
        //on each element in the data array push the date and price to respective array
        $.each(result.dataset_data.data, function ( index, subarray ) {
          timeseries.date.push(subarray[0]);
          timeseries.price.push(subarray[4]);
        });
        //on last element in data build price object
        var mostRecentDataIndex = result.dataset_data.data.length - 1;
        price.date = result.dataset_data.data[mostRecentDataIndex][0];
        price.open = result.dataset_data.data[mostRecentDataIndex][8];
        price.high = result.dataset_data.data[mostRecentDataIndex][9];
        price.low = result.dataset_data.data[mostRecentDataIndex][10];
        price.close = result.dataset_data.data[mostRecentDataIndex][11];
      });
      stockReq.done(function() {
        buildStockHistoryChart(companyInfo.timeseries).buildPrice(companyInfo.price).buildFundamentalsTable(companyInfo.fundamentals);
      });
    }
  });
  //object constructors to be inserted into companyInfo
  //object contains adjusted prices
  function Price() {
    this.date = "";
    this.open = 0.00;
    this.high = 0.00;
    this.low = 0.00;
    this.close = 0.00;
  }
  //object contains arrays for use with stock history chart
  function Timeseries() {
    this.date = ['date'];
    this.price = ['price'];
  }
  //object contains necessary fundamentals
  function Fundamentals() {

  }
  function CompanyInfo(timeseries, price, fundamentals) {
    this.timeseries = timeseries;
    this.price = price;
    this.fundamentals = fundamentals;
  }
  return companyInfo;
}
