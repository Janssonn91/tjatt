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

// Setting upp REST routes
// (a Mongoose model + setting up routes)
const User = require('./classes/User.class');
new User(app);

const Channel = require('./classes/Channel.class');
new Channel(app);

const Message = require('./classes/Message.class');
new Message(app);

// Set up socket.io (do this before normal middleware and routing!)
const io = require('socket.io')(
  global.httpServer, 
  {
    path: global.production ? '/api/socket' : '/socket',
    serveClient: false
  }
); 

// Use socket.io
io.on('connection', function(socket){

  console.log('user connected');
  
  socket.on('chat message', function(message){
    console.log('message: ' + message);
    io.emit('chat message', message);
  });
  //close web reload 
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});


