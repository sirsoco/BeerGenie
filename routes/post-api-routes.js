var db = require('../models');

// Retrieves all the beers saved by a user
module.exports = function(app) {
    app.get('/api/favorites', function(req, res) {
        var query ={};
        if(req.query.favorite_id) {
        query.FavoriteId = req.query.favorite_id
        }
    db.Favorite.findAll({
        where: query,
        include: [db.User]
    }).then(function(dbFavorite) {
        res.json(dbFavorite)
    }).catch(function (err) {
        res.status(401).json(err);
      }); 
});
 //@Ben @Emilee: Issue was that we were not using Params on Post 
 
 // Retrieves saved beers by id 
app.get("/api/favorites/:id", function(req, res) {db.Favorite.findOne({
        where: {
          id: req.params.id
        },
        include: [db.User]
    }).then(function(dbFavorite) {
        console.log(dbFavorite)
        res.json(dbFavorite);
    }).catch(function (err) {
        res.status(401).json(err);
      }); ;
});

// Adds a favorite  beer to the database 
app.post("/api/favorites", function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorite) {
        res.json(dbFavorite)
    });
});
 } 
