// requiring necessary npm packages
const axios = require('axios');

// requiring passport as we've configured it
var passport = require('../config/passport');

var db = require('../models')
//beer lib
var Beer = require('../lib/beer.js');

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, '/api/login');
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  // route for logging user out
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });
  // route for getting some data about our user to be used client side
  app.get('/api/user_data', function (req, res) {
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
  app.get('/api/favorites/:id', function (req, res) {
    db.Favorite.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.User],
    })
      .then(function (dbFavorite) {
        console.log(dbFavorite);
        return res.json(dbFavorite);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  // route to delete a beer from BeerGenie API
  app.delete('/api/favorites/:id', function (req, res) {
    db.Favorite.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbFavorite) {
      res.json(dbFavorite);
      console.log('Beer Deleted');
    });
  });
  app.post('/app/search/');
  // route to search using brewery API
  app.get('/breweerdb', function (req, res) {
    const queryURL = `https://api.brewerydb.com/v2/beers?key=7873bf684e7db7e59e55ea9dbc1e8d4e&name=${id}`;
    console.log(queryURL);
    axios
      .get(queryURL)
      .then(
        function ({ data }) {
          console.log(data);
          res.json(data);
        }
        // const repoNames = res.data.map(function(repo) {
        // return repo.name;
      )
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });
  // post route to search using untappd API
  app.post('/api/search/:beername', function (req, res) {
    console.log('beername');
     //selecting he string value of beer search
    //assiging the beer parameter for middleware function
    var id = req.body.beername;
    var sort = 'name'
    var limit = 1
    var offset = 2
    console.log(id);
  
    // config 
    var config = {
      method: 'get', 
      url: `https://api.untappd.com/v4/search/beer?q=${id}&client_id=C07D8B1B31F42D67ABDAB78E49204B7E69788672&client_secret=2CBAEF54C119820777DADB2E0E6ACE4115E95295&sort=${sort}&offset=${offset}&limit=${limit}`
    };
    console.log(config.url);
    axios(config)
      .then(function (reply) {
       
        var beers = JSON.stringify(reply.data.response.beers);
        var beersArray = beers.split(',');
        // beersArray
        var beer_ = beersArray.slice(4)
        beerName = req.body

        //console.log(beer_);

        // Add a beer to the database using sequelize
        db.Favorite.create({

            beerName: req.body.beerName,
          })
        
      }
      ).then( (beer_) => {axios.get('/postFavorites')}//).then(function(beer_) {
        //return console.log('hello')})

      )
      .catch(function (error) {
        console.log(error);
  })
});

};
