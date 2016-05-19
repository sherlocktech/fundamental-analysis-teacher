var main = function(){
  //when "Go!" button is clicked build the Dashboard
  $('#search .btn').click( function() {
    var query = $( '#company-search' ).val();
    console.log(query); //debug purposes
    var companyInfo = buildDashboard(query);
    console.log(companyInfo); //debug purposes
  });
};
main();
