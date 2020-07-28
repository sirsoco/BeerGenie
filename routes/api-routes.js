// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
var search =
// var search = require('../search')

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
    res.redirect("/");
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

  app.get("/api/favorites/search/:name", searchBeer)




  function searchBeer(req, res) {

     //req = $('#forum-search').val()
     //rank = $('#rank').val()

     
    
    const beerData = `https://api.brewerydb.com/v2/beers?key=7873bf684e7db7e59e55ea9dbc1e8d4e&name=${req.params.name}`;
    
    axios.get(beerData)
      .then(({data}) => {
        console.log(data)
    
        res.json(data);
        
    /*var beer = new class beer {
      constructor(Id, rank, name,
      description, abv, labels)

      {

      Id = beerData.Id  
      rank = req.rank;
      name = beerData.name;
      description = beerData.description
      abv = beerData.abv
      labels= beerData.labels;

        };
      } */
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);

    }); 
    
    // return //renderFavorites(beer)

  };
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

// route for deleting a beer from favorites
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
};

// function postBeer(beer) {
//     // Adds a favorite beer to the database 
//     // Code not being associated 
    
    
//     db.Favorite.create(beer).then(dbFavorite => {
//       console.log("added adult beverage: ", dbFavorite)
//       res.json(dbFavorite)
//     })
//     .catch(  (err) => {res.status(401).json(err)});
  
//                   };

        
            

//    app.get('/api/favorite')
//     db.Favorite.findAll({
//       where: query,
//       include: [db.User],
//     })
//       .then(function (dbFavorite) {
//         res.json(dbFavorite);
        
//         console.log(dbFavorite);
//       })
//       .catch(function (err) {
//         res.status(401).json(err);
//       }); 
// });

// // route for getting from favorites based off of id
//   app.get("/api/favorites/:id", function(req, res) {db.Favorite.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [db.User]
// }).then(function(dbFavorite) {
//     console.log(dbFavorite)
//     return res.json(dbFavorite);
//   })
//   .catch(function (err) {
//     res.status(401).json(err);
//   }); 
// });
// // route for deleting a beer from favorites
// app.delete("/api/favorites/:id", function(req, res) {
//   db.Favorite.destroy({
//     where: {
//       id: req.params.id,
//     },
//   }).then(function (dbFavorite) {
//     res.json(dbFavorite);
//     console.log("Beer Deleted");
//   });
// });

// }
// };

