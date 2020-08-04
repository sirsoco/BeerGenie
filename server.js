// requiring necessary npm packages
const express = require('express');
const session = require('express-session');

// requiring passport as we've configured it
var passport = require('./config/passport');

// setting up port & requiring models to syncing
var PORT = process.env.PORT || 8080;
var db = require('./models');

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// tracking user's log-in status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var UntappdClient = require("node-untappd");
var untapped = require('untappd');

// importing routes
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

// syncing database and give back feedback
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});
