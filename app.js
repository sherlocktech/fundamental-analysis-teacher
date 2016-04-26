//define app
var main = function(){
  //when button is clicked build the stock price history chart
  $('#search .btn').click( function() {
    var query = $( '#company-search' ).val();
    var companyInfo = build(query);
    console.log(companyInfo);
  });
};

//run app
main();
