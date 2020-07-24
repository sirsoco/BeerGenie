
var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

// Creates a "Character" model that matches up with DB
var favorites = sequelize.define("beers", {

  beer_id: Sequelize.STRING,

  user_id: Sequelize.INTEGER

 
}, {

  freezeTableName: true
});


Character.sync();


module.exports = Favorites;
