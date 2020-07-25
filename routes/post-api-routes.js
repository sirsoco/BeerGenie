var db = require('../models');

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

/*app.post("/api/favorites", function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorite) {
        res.json(dbFavorite)
    });
});

*/ } 
