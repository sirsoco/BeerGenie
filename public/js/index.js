$(document).ready(function () {
  // refrences to form and searchh params
  var searchForm = $("form.search");
  var qInput = $("input.q");

  // event listener for search
  console.log("index.js");
  searchForm.on("submit", function (event) {
    event.preventDefault();
    console.log("searched");
    var beername = { q: qInput.val() };
    req.body.beername;
    app.post("/api/search/:beername", function () {
      //selecting serch parameters

      console.log(q);
      // return console.log(JSON.stringify(q));
      // need condition to alert if search not entered
    });
  });
});
