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
        console.log(dbFavorite)
    }).catch(function (err) {
        res.status(401).json(err);
      }); 
});

// Retrieves ranks and adds what user Ranked 
app.get('/api/rank', function(req,res) {
  var query = {};
  if(req.query.rank_id) {
    query.RankId = req.query.rank_id
  }
  db.Rank.findAll({
    where:query,
    include: [db.User] 
  }).then(function(dbRank) {
      res.json(dbRank)
      console.log(dbRank)
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

 //@Ben @Emilee: Issue was that we were not using Params on Post 
 
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
    }).catch(function (err) {
        res.status(401).json(err);
      }); 
});

//Retrieves individuals ranks
// Displays only User who added rank 
app.get('/api/rank/:id', function(req,res) {db.
Rank.findOne({
      where: {
        id: req.params.id
    },
    include: [db.User]
  }).then(function(dbRank) {
      console.log(dbRank)
      res.json(dbRank);
  }).catch(function (err) {
      res.status(401).json(err);
    });
});

// Adds a favorite beer to the database 
app.post("/api/favorites", function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorite) {
        res.json(dbFavorite)
        console.log(dbFavorite)
    }).catch( function (err) {
      res.status(401).json(err)
    });
});

// Adds a rank to a favorite beer 
  app.post("/api/rank", function(req, res) {
    db.Rank.create(req.body).then(function(dbRank) {
    res.json(dbRank)
    console.log(dbRank)
  });
});

// Deletes a favorite beer in the database
 app.delete("/api/favorites/:id", function(req, res) {
    db.Favorite.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFavorite) {
      res.json(dbFavorite);
      console.log('Beer Deleted')
    });
  });

  app.delete('/api/rank/:id', function(req, res) {
    db.Rank.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRank) {
      res.json(dbRank);
      console.log('Rank Delete')
    });
  });

};