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
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')(expressSession);
const hasha = require('hasha');
const jo = require('jpeg-autorotate');
const fs = require('fs');
const pathTo = require('path');
global.passwordSalt = "aasölkjadgöl\}]23%#¤#%(&";
const apiRoutes = require('./routes/api');
const sharedsession = require("express-socket.io-session");
const session = expressSession({
  secret: 'big fancy secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  // Spara session i databasen, lever i 30 dagar
  store: new connectMongo({ mongooseConnection: mongoose.connection, ttl: 30 * 24 * 60 * 60 })
})

// if we want to move the salt later on
const salty = require('./tjat.json')
global.passwordSalt = salty.salt;

// Middleware to get body fro posts
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session);

// Set up socket.io (do this before normal middleware and routing!)
const io = require('socket.io')(
  global.httpServer,
  {
    path: global.production ? '/api/socket' : '/socket',
    serveClient: false
  }
);

// Use shared session middleware for socket.io
io.use(sharedsession(session, {
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
const ChatMessage = new Message(app).myModel;
//new Message(app).myModel;



io.on('connection', (socket) => {
  console.log("user is connected")

//   socket.on("login", function(userdata) {
//     console.log(userdata)
//     socket.handshake.session.loggedInUser = userdata;
//     socket.handshake.session.save();
// });


  socket.on('chat message', async (messageFromClient) => {
    console.log(messageFromClient)
    // Get the user from session
    let user = socket.handshake.session.loggedInUser;
    // If the room isn't allowed for the user then do nothing
    let c = messageFromClient.channel;
    if(
      typeof c !== 'string' ||
      !user.channel.includes(c)
    ){ return; } 

    // Create a mongoose ChatMessage and write to the db
    let message = new ChatMessage({
       ...messageFromClient
    });
    console.log(message)
    await message.save();

    // Send the message to all the sockets in the room
    io.to(c).emit('chat message',[{
      sender: message.sender, 
      text: message.text,
      channel: message.channel,
      textType: message.textType,
      star: message.star,
    }]);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.get('/hello', (req, res) => {
  res.send('hello')
})

const mailer = require('./classes/Sendmail.class');
app.post('/send-mail', mailer)

app.post('/users', (req, res) => {
  console.log(req.session);
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        new User({
          username: req.body.username,
          email: req.body.useremail,
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

app.get('/users/:_id', (req, res) => {
  User.findOne({_id: req.params._id })
  .then(user=>{
    if (!user) {
      res.json({ success: false })
    } 
    else { res.json(user)}
  }).catch(
    err=>{
      console.log(err)
    }
  )

})

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
          req.session.loggedInUser = user;
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
    { $push: { contact: req.body.contact, channel: req.body.channel, group: req.body.group } }
  )
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      throw err;
    });
});

app.put('/users/:_id/setting', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { nickname: req.body.nickname } }
  )
    .then(user => {
      if (user) {
        res.json({ success: true, user })
      } else {
        res.json({ success: false })
      }
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