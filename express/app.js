/*
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;
let express = require('express');

// Middleware to get body fro posts
app.use(express.json({
  extended: false
}));

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'src/components/images/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// const upload = multer({ storage: storage });


// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
new User(app);

const Channel = require('./classes/Channel.class');
new Channel(app);