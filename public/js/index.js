$(document).ready(function() {
    // refrences to form and searchh params
    var searchForm  = $('form.search');
    var qInput = $('input.q');

// event listener for search
console.log("index.js");
searchForm.on('submit', function(event) {
    event.preventDefault();
    console.log("searched");

    //selecting serch parameters
    var q = { q: qInput.val() };
    return console.log(JSON.stringify(q));

    // need condition to alert if search not entered 
})
});