// Sequelize Dependencie 
var Sequelize = require("sequelize");

var sequelie = require('../config/connection.js'
);

//Creates a "beer"

var Beer = sequelie.define('Beers', {
  routeName: Sequelize.STRING,
  // the name of the character (a string)
  beerName: Sequelize.STRING,

});
