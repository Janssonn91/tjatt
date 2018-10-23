/*
  The express app is a global called app
  It can respond on all routes under /api
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tjatt', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (e) => {
  console.error(e);
});
db.once('open', () => {
  console.info('db connected');
});

let app = global.expressApp;
let express = require('express');
const multer = require('multer');
const session = require('express-session')
const connectMongo = require('connect-mongo')(session);
const hasha = require('hasha');
const fs = require('fs');
const pathTo = require('path');
global.passwordSalt = "aasölkjadgöl\}]23%#¤#%(&";

// Middleware to get body fro posts
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'big fancy secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  // Spara session i databasen, lever i 30 dagar
  store: new connectMongo({ mongooseConnection: mongoose.connection, ttl: 30 * 24 * 60 * 60 })
}));

// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
const Channel = require('./classes/Channel.class');
const Message = require('./classes/Message.class');
// new User(app);
// new Channel(app);
// new Message(app);

app.get('/hello', (req, res) => {
  res.send('hello')
})

app.post('/users', (req, res) => {
  console.log(req.session);
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        new User({
          username: req.body.username,
          password: req.body.password,
          nickname: req.body.username
        }).save().then(user => {
          req.session.userId = user._id;
          res.json({ success: true, user: user })
        })
      } else {
        res.json({ success: false })
      }
    }).catch(err => console.log(err));
});

app.get('/users', (req, res) => {
  User.find().then(user => res.json(user))
});

app.get('/logout', (req, res) => {
  delete req.session.userId;
  res.json({ success: 'Successfully logged out' })
})

app.get('/login', (req, res) => {
  User.findById(req.session.userId)
    .then(user => {
      if (user) {
        res.json({ loggedIn: true, user: user })
      } else {
        res.json({ loggedIn: false })
      }
    })
});

app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        res.json({ success: false })
      } else {
        const hash = hasha(
          req.body.password + global.passwordSalt,
          { encoding: 'base64', algorithm: 'sha512' }
        );
        console.log(hash, user.password);
        if (user.password === hash) {
          req.session.userId = user._id;
          res.json({ success: true, user: user })
        } else {
          res.json({ success: false, message: hash })
        }
      }
    })
});


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

  /**
   * 1. Hitta användaren som är inloggad
   * 2. Lägg till imgpath till användaren
   * 3. Spara användaren
   */
  User.findById(req.session.userId)
    .then(user => {
      // If user already has an image field, then remove file
      if (user.image) {
        const pathToImage = pathTo.join(__dirname, '..', 'public', user.image.slice(1))
        console.log(pathToImage);
        fs.unlink(pathToImage, (err) => {
          if (err) throw err;
          console.log('Deleted file')
        })
      }
      user.image = req.file.path.split('public')[1];
      user.save().then(user => {
        console.log(user)
        res.json({ path: user.image })
      })

    });
});


// // Set up socket.io (do this before normal middleware and routing!)
// const io = require('socket.io')(
//   global.httpServer,
//   {
//     path: global.production ? '/api/socket' : '/socket',
//     serveClient: false
//   }
// );

// // Use socket.io
// io.on('connection', function(socket){

// Set up socket.io (do this before normal middleware and routing!)
// const io = require('socket.io')(
//   global.httpServer,
//   {
//     path: global.production ? '/api/socket' : '/socket',
//     serveClient: false
//   }
// );

// Use socket.io
// io.on('connection', function (socket) {

//   console.log('user connected');

//   socket.on('chat message', function (message) {
//     console.log('message: ' + message);
//     io.emit('chat message', message);
//   });
//   //close web reload 
//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });
// });



