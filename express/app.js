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
const ExpressSession = require('express-session')
const connectMongo = require('connect-mongo')(ExpressSession);
const session = ExpressSession({
  secret: 'big fancy secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  // Spara session i databasen, lever i 30 dagar
  store: new connectMongo({ mongooseConnection: mongoose.connection, ttl: 30 * 24 * 60 * 60 })
})

const hasha = require('hasha');
const jo = require('jpeg-autorotate');
const fs = require('fs');
const pathTo = require('path');
global.passwordSalt = "aasölkjadgöl\}]23%#¤#%(&";
const apiRoutes = require('./routes/api');

// if we want to move the salt later on
const salty = require('./tjat.json')
global.passwordSalt = salty.salt;

const io = require('socket.io')(
  global.httpServer,
  {
    path: global.production ? '/api/socket' : '/socket',
    serveClient: false
  }
);

// Middleware to get body fro posts
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session);



const sharedSession = require('express-socket.io-session');

io.use(sharedSession(session, {
  autoSave: true
}));

app.use("/", apiRoutes)

// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
const Channel = require('./classes/Channel.class');
const Message = require('./classes/Message.class');
// new User(app);
new Channel(app);
// new Message(app);


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
    }).catch(err => {
      console.log(err);
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
        //console.log(hash, user.password);
        if (user.password === hash) {
          req.session.userId = user._id;
          res.json({ success: true, user: user })
        } else {
          res.json({ success: false, message: hash })
        }
      }
    }).catch(err => {
      console.log(err);
    })
});

app.put('/users/:_id', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $push: { contact: req.body.contact, channel: req.body.channel } }
  )
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      throw err;
    });
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
  User.findById(req.session.userId)
    .then(user => {
      // If user already has an image field, then remove file
      if (user.image) {
        const pathToImage = pathTo.join(__dirname, '..', 'public', user.image.slice(1))
        console.log('pathToImage: ', pathToImage);
        fs.unlink(pathToImage, (err) => {
          if (err) throw err;
          console.log('Deleted file')
        })
      }
      user.image = req.file.path.split('public')[1];
      let joOptions = {};
      jo.rotate(req.file.path, joOptions, function (error, buffer, orientation) {
        if (error) {
          console.log('An error occurred when rotating the file: ' + error.message);
          return;
        }
        //console.log('Orientation was: ' + orientation);
        let testPath = req.file.path;
        // upload the buffer to s3, save to disk or more ...
        fs.writeFile(req.file.path, buffer, function (err) {
          if (err) {
            return console.log(err, testPath);
          }
          console.log("The file was saved!", testPath);
        });
      });
      user.save().then(user => {
        //console.log(user)
        res.json({ path: user.image })
      })

    });
});

// Socket Implementation


io.on('connection', (socket) => {
  // let user = await User.findOne({ id: socket.handshake.session.userId })
  console.log('userino')
  socket.on('chat message', async (messageFromClient) => {
    let user = socket.handshake.session.userId;
    console.log(messageFromClient);
    // let room = messageFromClient.room;
    // if (typeof room !== 'string' || !user.chatRooms.includes(room)) {
    //   return;
    // }

    // let message = new Message({
    //   ...messageFromClient,
    //   sender: user._id
    // });
    // await message.save();

    io.emit('chat message', messageFromClient);
  });

  socket.on('asking to join room', async (room) => {
    let user = socket.handshake.session.userId;

    if (typeof room === 'string' && user.chatRooms.includes(room)) {
      socket.join(room)

      let messages = await (Message.find({ room: room }).populate('sender').exec())
      messages = messages.map(x => ({
        username: x.sender.username,
        text: x.messageTest,
        room: x.room,
        date: x.date
      }));
      socket.emit('chat message', messages)
    }
  });

  socket.on('disconnect', () => {

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




// const Channel = require('./classes/Channel.class');
// new Channel(app);

const Repo = require('./classes/Repo.class');
new Repo(app);