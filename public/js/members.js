$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  // refrences to form and searchh params
  var searchForm = $("form.search");
  var qInput = $("input.q")

  // event listener for search
  
  searchForm.on("submit", handleBeerSearchSubmit);
  
  function handleBeerSearchSubmit(event) {
    event.preventDefault();
    console.log('hello')
    if(!qInput){
    return;
  }
// caling the upsertBeer function and passing in the value of the beer input

upsertBeer()
  };

  // function for saving a beer
  function upsertBeer(data) 
  { var q = qInput.val();
    console.log(q);
    req.body.q
  }
    
});