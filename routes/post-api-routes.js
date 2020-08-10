//dependecies
var db = require("../models");
var axios = require("axios");

// Retrieves all the beers saved by a user
module.exports = function (app) {
  app.get("/api/favorites", function (req, res) {
    var query = {};
    if (req.query.favorite_id) {
      query.FavoriteId = req.query.favorite_id;
    }
    db.Favorite.findAll({
      where: query,
      include: [db.User],
    })
      .then(function (dbFavorite) {
        res.json(dbFavorite);
        console.log(dbFavorite);
      })
      .catch(function (err) {
        res.status(401).json(err);
      }); 
});


 // Retrieves saved beers by id 
 // Displays only User who added rank

app.get("/api/favorites/:id", function(req, res) {db.Favorite.findOne({
        where: {
          id: req.params.id
        },
        include: [db.User]
    }).then(function(dbFavorite) {
        console.log(dbFavorite)
        res.json(dbFavorite);
      })
      .catch(function (err) {
        res.status(401).json(err);
      }); 
});

// Adds a favorite beer to the database 
app.post('/api/favorites', function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorite) {
        res.json(dbFavorite)
        console.log(dbFavorite)
    }).catch( function (err) {
      res.status(401).json(err)
    });
});

// Deletes a favorite beer in the database
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

    // post route to search using untappd API
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
        console.log(beerName)
        //console.log(beer_);

        // Add a beer to the database using sequelize
        db.Favorite.create({

            beerName: id,
            UserId: 1,
            beerData: beer_

          })
        
      },
      ).then(function() {res.redirect("/")}).catch(function (error) {
        console.log(error);
  });
});
  

};


