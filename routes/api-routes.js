

//By team SEB
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var untappd = require("../node_modules/untappd");

//importing library
const Beer = require("../lib/beer.js")


module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

//function to link to search

  // here we make an axios call to query the database for a beer
  // first we define the url for the api call

 
  
    // return //renderFavorites(beer)

  
  // route for getting from favorites based off of id
  
  app.get("/api/favorites/:id", function(req, res) {db.Favorite.findOne({
    where: {
      id: req.params.id
    },
    include: [db.User]
}).then(function(dbFavorite) {
    console.log(dbFavorite)
    return res.json(dbFavorite);
  })
  .catch(function (err) {
    res.status(401).json(err);
  }); 
});

app.delete("/api/favorites/:id", function(req, res) {
  db.Favorite.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbFavorite) {
    res.json(dbFavorite);
    console.log("Beer Deleted");
  });
});

/*
// An example of how to use the UntappdClient.

// Definitions

// Replace this with your CLIENT ID
var clientId = "[ C07D8B1B31F42D67ABDAB78E49204B7E69788672]";

// Replace this with your CLIENT SECRET
var clientSecret = "[ 2CBAEF54C119820777DADB2E0E6ACE4115E95295]";

// Set to true if you want to see all sort of nasty output on stdout
var debug = false;

// The user we want to lookup for this example
var data = {};
	data.USERNAME = "[ sirsoco ]";



// Create Client
//var untappd = new Untappd(debug);
//untappd.setClientId(clientId);
//untappd.setClientSecret(clientSecret);

// EXAMPLE - List last 25 recent checkins of the given user
untappd.userActivityFeed(function(err, obj) {
  console.log('hello')
	if (debug)
		console.log(err, obj);
	if (obj && obj.response && obj.response.checkins && obj.response.checkins.items) {
		var beers = obj.response.checkins.items.forEach(function(checkin) {
			console.log(checkin);
			console.log(checkin.user.user_name, "drank", checkin.beer.beer_name);
			console.log("by", checkin.brewery.brewery_name);
			if (checkin.venue.venue_name)
				console.log("at", checkin.venue.venue_name);
			console.log("on", checkin.created_at);
		});
	} else {
		console.log(err, obj);
	}
}, data);

//app.

///express method for third-party api calls
//app.get('/beerme'){
  //url =

 // app.post("/authentication", passport.authenticate("local"), function (req, res) {
    //url = 'https//untappd.com/oauth/authenticate/?//client_id=CLIENTID&response_type=code&redirect_url=REDIRECT_URL';
  }