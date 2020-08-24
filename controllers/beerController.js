var db = require("../models");

// Retrieves all the beers saved by a user
module.exports = {
findAll: function (req, res) {
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
},
 // Retrieves saved beers by id 
 // Displays only User who added rank
findById: function(req, res) {db.Favorite.findOne({
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
},
// Adds a favorite beer to the database 
create: function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorite) {
        res.json(dbFavorite)
        console.log(dbFavorite)
    }).catch( function (err) {
      res.status(401).json(err)
    });
}
,
// Deletes a favorite beer in the database
remove:  function(req, res) {
    db.Favorite.destroy({
      where: {
        id: req.params.id,
      }
    }).then(function (dbFavorite) {
      res.json(dbFavorite);
      console.log("Beer Deleted");
    });
  }
};