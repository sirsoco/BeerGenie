// requiring necessary npm packages
const axios = require('axios');
const UntappdClient = require('untappd');

// requiring passport as we've configured it
var passport = require('../config/passport');

//client id & client secret 
const CLIENTID = 'C07D8B1B31F42D67ABDAB78E49204B7E69788672';
const CLIENTSECRET = '2CBAEF54C119820777DADB2E0E6ACE4115E95295';

//beer lib
var Beer = require('../lib/beer.js');

//building url
var url = `https://api.untappd.com/v4/search/beer?client_id=${CLIENTID}&client_secret=${CLIENTSECRET}`;
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

  // route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

  // route for getting some data about our user to be used client side
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


  // route for getting a beer from BeerGenie API 
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

// route to delete a beer from BeerGenie API
app.delete("/api/favorites/:id", function(req, res) {
  db.Favorite.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbFavorite) {
    res.json(dbFavorite);
    console.log("Beer Deleted");
  });
})

//route for searching a beer
app.get(url, function(req, res1){

})
  // route for getting from favorites based off of id
  



  

  

//const url = `https://api.brewerydb.com/v2/beers?key=7873bf684e7db7e59e55ea9dbc1e8d4e&name=${req.params.name}`;
    
//res.body
  //  beerData = axios.get(url);
};
