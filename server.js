const express = require("express");
const logger = require('morgan');
const routes = require('./routes')
var db = require("./models");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3001;


// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger('dev'));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets
if(process.env.Node_ENV === "production") {
  app.use(express.static("client/build"));
}

// add routes to both API and view
app.use(routes);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
