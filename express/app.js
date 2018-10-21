/*
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;
let express = require('express');
const multer = require('multer');
// Middleware to get body fro posts
app.use(express.json({
  extended: false
}));
// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
const userModel = new User(app);

const Channel = require('./classes/Channel.class');
new Channel(app);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now() + '.' + file.mimetype.split('image/')[1])
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  console.log(req.body)

  res.json({ path: req.file.path });

})
