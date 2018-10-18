/*
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;
let express = require('express');
const apiRoutes = require('./routes/api');

// Middleware to get body fro posts
app.use(express.json({
  extended: false
}));

app.use("/", apiRoutes)

// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
new User(app);

const Channel = require('./classes/Channel.class');
new Channel(app);