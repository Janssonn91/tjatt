/*
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;
let express = require('express');
<<<<<<< HEAD
const apiRoutes = require('./routes/api');
=======
const multer = require('multer');
>>>>>>> chat-style-server

// Middleware to get body fro posts
app.use(express.json({
  extended: false
}));

app.use("/", apiRoutes)

// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
const Channel = require('./classes/Channel.class');
const Message = require('./classes/Message.class');
new User(app);
new Channel(app);
new Message(app);

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

//   console.log('user connected');

//   socket.on('chat message', function(message){
//     console.log('message: ' + message);
//     io.emit('chat message', message);
//   });
//   //close web reload
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });

// });


<<<<<<< HEAD
const Channel = require('./classes/Channel.class');
new Channel(app);

const Repo = require('./classes/Repo.class');
new Repo(app);
=======
>>>>>>> chat-style-server
