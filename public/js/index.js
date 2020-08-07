$(document).ready(function() {
    // refrences to form and searchh params
    console.log('ready')
    var searchForm  = $('form.search');
    var qInput = $('input#beer').val();

// event listener for search
console.log('index.js');
searchForm.on('submit',
function(event) {
    event.preventDefault();
    console.log('submit')

    var q = qInput.val();

// condition to alert if search not entered 
app.get('/api/search:beer', function (req, res, qInput) {
    console.log('untappd')
    req.body.beer
   //res.params.queryURL
    //selecting the string value of beer search
    var id = req.params.beer
    //assiging the beer parameter for middleware function
    var id = req.params.beername
  console.log(req.params.beer)
    var config = {
      method: 'get',
      url: `https://api.untappd.com/v4/search/beer?q=${id}&client_id=C07D8B1B31F42D67ABDAB78E49204B7E69788672&client_secret=2CBAEF54C119820777DADB2E0E6ACE4115E95295`,
      headers: { },
      
    };
    console.log(config.url);
    axios(config)
    .then(function (reply) {
      var beers = (JSON.stringify(reply.data.response.beers));
      var beersArray = beers.split(",")
      console.log(beersArray);
      new Beer()
    })
    .catch(function (error) {
      console.log(error);
    })}
  )}



//POST TO SEARCH ROUTE
function searchingBeer() {
    
    console.log("hello");
}
    //   .then(function(data) {
    //     window.lrocation.replace('/members');
    //     // If there's an error, handle it by throwing up a bootstrap alert
    //   })
    //   .catch(handleLoginErr);}

})
