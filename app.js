$(document).ready(function() {
  var main = function(){
    //when button is clicked build the stock price history chart
    $('#search .btn').click( function() {

      var query = $( '#company-search' ).val();
      var companyInfo = buildDashboard(query);
      console.log(companyInfo);
    });
  };
});
