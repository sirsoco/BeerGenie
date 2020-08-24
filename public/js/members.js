 $(document).ready(function () {
  // refrences to form and searchh params
  var searchForm = $("form.search");
  var qInput = $("input#q")

  // event listener for search
  console.log("index.js");

 

  //event listener for search form 
$(document).on('submit','#beer-search', handleBeerFormSubmit);
  
  function handleBeerFormSubmit(event) {
    event.preventDefault();
    console.log('handleBeerFormSubmit');
    //preventing an empty search
    if(!qInput.val().trim().trim()){
      return;
    }
    //selecting value of search form & passing to upsertBeer func
    upsertBeer({
      beername: 
      qInput
      .val()
      .trim()
    });
 }
  // A function for searching an author. 
  function upsertBeer(beerData) {
   console.log(beername)
    $.post('/api/search/', beerData)
      .then(getBeers) }
 function postFavorite() {
   console.log("hello");
 }

});