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
const ChannelREST = require('./classes/Channel.class');
const Message = require('./classes/Message.class');
//socket methods
const UserManager = require('./classes/UserManager');
const ChannelManager = require('./classes/ChannelManager');

const userManager = new UserManager(app, User);
const channelManager = new ChannelManager(app, ChannelREST, Message);
// new User(app);
//const Channel = new ChannelREST(app).myModal;
const channel = new ChannelREST(app).myModel;
const ChatMessage = new Message(app).myModel;

let systemChannel = "";
let ai = "";

let onlineUsers = [];

// setSystemMessageToDB(data){
//   let id = "";
//   let messageText = "";
//   switch(data.type) {
//     case "invitation":
//         id = data.invitee.toString();
//         messageText = data.inviter + "&ask&"+ data.invitee + "&toJoin&" + data.newChannel._id;
//         break;
//     case "acceptance":
//         id = data.acceptee.toString();
//         messageText = data.accepter+ "&accept&" + data.acceptee +"&toJoin&" + data.targetChannel;
//         break;
//     case "rejection":
//         id = data.rejectee.toString();
//         messageText = data.rejecter +"&reject&" + data.rejectee;
//         break;
//     default: 
//     break;
//   };

//   let c = await channel.findOne({
//     channelname: id + "system"
//   });

//   let systemMessage = new ChatMessage({
//     sender: id,
//     text: messageText,
//     textType: data.type,
//     unread: true,
//     channel: c._id,
//   });
  
//   await systemMessage.save().then(message=>{
//     return message._id;
//   })
// }

io.on('connection', (socket) => {


  let user = socket.handshake.session.loggedInUser;
  
  
  

  socket.on('online', (userId) => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    onlineUsers.push(userId)
    console.log("onlineuser", onlineUsers)
    console.log("online message received")
   
    socket.broadcast.emit('online', {
      onlineUsers
    });

  })

  socket.on('sign up', (user) => {
    console.log("sign up", user)
    socket.username = user;
    new channel({
      channelname: user._id + "system",
      open: true,
      group: false,
    }).save().then((c)=>{
      User.findOneAndUpdate(
        { _id: user._id},
        { $push: { channel: c._id}}
        ).catch(err=>{
          throw err;
        });
      User.findOneAndUpdate(
        {_id: ai},
        {$push: { channel: c._id}}
      ).catch(err=>{
        throw err;
      });
    }).catch(err=> {throw err});

    socket.broadcast.emit('sign up', {
      username: socket.username
    });
  })


  socket.on('login', (userId) => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    onlineUsers.push(userId)
   
    User.findOne({_id: userId}).then(u=> {
      let channels = u.channel;
      for(let channel of channels){
        if(channel){
          channel = channel.toString();
          socket.join(channel, () => {
            let rooms = Object.keys(socket.rooms);
            io.to(channel).emit(userId + "has joined in channel" + channel);
          });
        }
    }
    socket.broadcast.emit('login', {
      loginUser: onlineUsers
    })
    })
  })

  socket.on('newChannel', (channel) => {
    console.log('new channel', channel._id);
    socket.join(channel._id, ()=> console.log('received channel', socket.rooms));
  })



  socket.on('logout', (userId) => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    console.log("user logout", userId, onlineUsers)
    socket.broadcast.emit('logout', {
      loginUser: onlineUsers
    })
  })
  
  socket.on('system', async (data) => {

    //create group channel 
    // data: {newChannel: whole channel info includes id, creater:userId}
    if(!data.invitee && data.newChannel){
      socket.join(data.newChannel._id, ()=>{
        console.log("socket room", socket.rooms);
      });
      data.type="create group";
      for(let member of data.newChannel.members){
        if(member!==user._id){
          let c = await channel.findOne({
            channelname: member + "system"
          });
          let systemMessage = new ChatMessage({
            sender: data.creater,
            text: data.creater + "&inviteYouToChannel&" + data.newChannel.channelname,
            textType: "addedToGroup",
            unread: true,
            channel: c._id,
          });
          
          await systemMessage.save();
        }  
        }
       
        let message= {
          textType: "addedToGroup",
          initiator: data.creater,
          targetChannel: data.newChannel,
          unread: true,
          addedMembers: data.newChannel.members,
        }

        socket.broadcast.emit('group', message);
    }

    //contact channel invitation
  
    
      if(data.type==="inviation"){
          // data:  {newChannel: id, invitee: userId, inviter: user._id, type:"inviation"}
      let c= await channel.findOne({channelname: data.invitee + "system"});
      let systemMessage = new ChatMessage({
         sender: data.invitee,
         text: data.inviter + "&ask&"+ data.invitee + "&toJoin&" + data.newChannel._id,
         textType: "invitation",
         unread: true,
         channel: c._id,
       });
       let m="";
       await systemMessage.save().then(message=>{
         m=message._id;})
        let message= {
          textType: "invitation",
          initiator: data.inviter,
          targetChannel: data.newChannel._id,
          invitee: data.invitee,
          unread: true,
          id: m,
        }

      socket.broadcast.emit('invitation', message);
    }

   

    if(data.type === 'acceptance'){
      console.log('acceptance', data);
       //data: {accepter: id, acceptee: id, targetChannel: channelId, type:"acceptance" }
       let c = await channel.findOne({channelname: data.acceptee.toString() + "system"});
       let systemMessage = new ChatMessage({
         sender: data.accepter,
         text: data.accepter+ "&accept&" + data.acceptee +"&toJoin&" + data.targetChannel,
         textType: 'acceptance',
         unread: true,
         channel: c._id,
       })
       let m="";
       await systemMessage.save().then(message=>{
         m = message._id;
       })

       let message = {
        textType: "acceptance",
        sender: data.accepter,
        targetChannel: data.targetChannel,
        acceptee: data.acceptee,
        unread: true,
        id: m,
       }

       channel.update(
         {_id: data.targetChannel},
         {$set: {open: true}}
          ).then((data) => {
           console.log(data)} )
          .catch(err => {
            throw err;
          });

       socket.broadcast.emit('acceptance', message);
    }

    if(data.type=== 'rejection'){
      console.log("rejection", data);
      // data: {rejecter: id, rejectee: id, type:'rejection'}
      // rejecter emit rejection
      let c= await channel.findOne({channelname: data.rejectee.toString() + "system"});
      let systemMessage = new ChatMessage({
        sender: data.rejecter,
        text: data.rejecter +"&reject&" + data.rejectee,
        textType: "rejection",
        unread:true,
        channel:c._id,
      })
      let m="";
      await systemMessage.save().then(message=>{
        m= message._id;
      })
      let message= {
        textType: "rejection",
        initiator: data.rejecter,
        rejectee: data.rejectee,
        unread: true,
        id: m,
      }

    socket.broadcast.emit('rejection', message);

    }

    if(data.type==="editMembersInGroup"){
      console.log("edit", data);
      //data:  { targetChannel: whole channel info
        // initiator: this.props.userStore.user._id,
        // addedMembers: addedUser,
        // removedMembers: removedUser,
        // type: "editMembersInGroup"}
        if(data.addedMembers.length>0){
          let messageDict={};
          for(let m of data.addedMembers){
            let c= await channel.findOne({channelname: m.toString() + "system"});
            let systemMessage = new ChatMessage({
              sender: data.initiator,
              text: data.initiator + "&inviteYouToChannel&" + data.targetChannel.channelname,
              textType: "addedToGroup",
              unread:true,
              channel:c._id,
            });
            let mes="";
            await systemMessage.save().then(message=>{
              mes= message._id;
              messageDict[m]= mes;
            })
          }
          let message= {
            textType: "addedToGroup",
            initiator: data.initiator,
            targetChannel: data.targetChannel,
            unread: true,
            addedMembers: data.addedMembers,
            messageDict: messageDict,
          }
          socket.broadcast.emit('group', message);
        }

        if(data.removedMembers.length>0){
          let messageDict={};
          for(let m of data.removedMembers){
            let c= await channel.findOne({channelname: m.toString() + "system"});
            let systemMessage = new ChatMessage({
              sender: data.initiator,
              text: data.initiator + "&hasRemovedYouFromChannel&" + data.targetChannel.channelname,
              textType: "removeFromGroup",
              unread:true,
              channel:c._id,
            });
            let mes="";
            await systemMessage.save().then(message=>{
              mes= message._id;
              messageDict[m]= mes;
            })
          }
          let message= {
            textType: "removeFromGroup",
            initiator: data.initiator,
            targetChannel: data.targetChannel,
            unread: true,
            removedMembers: data.removedMembers,
            messageDict: messageDict,
          }
          socket.broadcast.emit('group', message);
        }
        
        
        
    }
  
  });





  socket.on('chat message', async (messageFromClient) => {
 
    let c = messageFromClient.channel;
    console.log("c", c)
    socket.join(c);
  

    // Create a mongoose ChatMessage and write to the db
    let message = new ChatMessage({
      ...messageFromClient,
    });
    await message.save();

    // Send the message to all the sockets in the channel
    io.to(c).emit('chat message', [{
      sender: message.sender,
      text: message.text,
      channel: message.channel,
      textType: message.textType,
      star: message.star,
      unread: true,
      time: message.time,
    }]);
  });

  

  socket.on('rejection', async (data)=>{
      data.textType= 'rejection';
      socket.broadcast.emit('system', data);
      let c = await channel.findOne({
        channelname: data.rejectee + "system"
      });
      let systemMessage= new ChatMessage({
        sender: data.rejecter,
        text: data.rejecter +"&decline&" + data.rejectee,
        textType: "decline",
        unread: true,
      })
      await systemMessage.save();
  })


  socket.on('disconnect', () => {
    if (user) {
      onlineUsers = onlineUsers.filter(id => id !== user._id);
      console.log('client disconnect...', user._id);
      socket.broadcast.emit('logout', {
        loginUser: onlineUsers
      })
    }
    // EMILS DATOR BUGGAR LOSS PÅ RADEN UNDER


  });
});

app.get('/system', (req, res)=>{
  res.json({systemChannel: systemChannel, systemUserId: ai})
  
})

// app.get('/hello', (req, res) => {
//   res.send('hello')
// })

app.post('/pwcheck', (req, res) => {
  const hash = hasha(
    req.body.pass + global.passwordSalt,
    { encoding: 'base64', algorithm: 'sha512' }
  );
  if (hash === req.body.oldpassword) {
    console.log('de stämmer')
    res.json({ success: true, hash: hash });
  }
  else {
    console.log('nix stämmer icke, försök igen');
    res.json(false);
  }
})

app.post('/pwhash', (req, res) => {
  const hash = hasha(
    req.body.pass + global.passwordSalt,
    { encoding: 'base64', algorithm: 'sha512' }
  );
  res.json({ success: true, hash: hash });
})

const nodemailer = require('nodemailer');
app.post('/mail-password', async function(req, res, next) {
 const password = [...Array(10)].map(_=>(Math.random()*36|0).toString(36)).join``;
 console.log('new password = ', password);
 const hash = await hasha(
 password + global.passwordSalt,
     { encoding: 'base64', algorithm: 'sha512' }
 );
 let updateResult = await User.findOneAndUpdate(
     { email: req.body.email},
     { $set: { password: hash } }
   )

 const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'tjatt.info@gmail.com',
     pass: 'tj@tt@WUMA17'
   },
   tls:{
     rejectUnauthorized: false
   }
 });

 let mailOptions = {
   from: '"Tj@ support"<noreply@tjat.net', // sender address
   to: `${req.body.email}`, // list of receivers
   subject: 'Tj@ reset password', // Subject line
   html: `
     <h2>Your password is resetted</h2>
     <P>Your new password is ${password}</p>
     <p>For your safety please take a moment and change this password to something else in your settings!</p>
     `
 };

 transporter.sendMail(mailOptions, (error, info, res) => {
   if (error) {
       return console.log(error);
   }
   console.log('password changed to ', password);
   // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 });
})

app.post('/users', async (req, res) => {
 const userResult = await User.findOne({ username: req.body.username });
 const emailResult = await User.findOne({ email: req.body.useremail });
 if (!userResult && !emailResult) {
   new User({
     username: req.body.username,
     email: req.body.useremail,
     password: req.body.password,
     nickname: req.body.username
   }).save().then(user => {
     req.session.userId = user._id;
     res.json({ success: true, user: user })
       const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'tjatt.info@gmail.com',
           pass: 'tj@tt@WUMA17'
         },
         tls:{
           rejectUnauthorized: false
         }
       });

       let mailOptions = {
         from: 'tjatt.info@gmail.com', // sender address
         to: `${req.body.useremail}`, // list of receivers
         subject: 'Welcome to tj@!', // Subject line
         html: `
         <h2>Welcome to tj@!</h2>
         <P>Dear ${req.body.username}, we are so happy to have you as a member in our tj@-community!</p>
         <p>Please take a moment and discover the power of tj@. Explore how to chat and share node-applications in groups.</p>
         `
       };

       transporter.sendMail(mailOptions, (error, info, res) => {
         if (error) {
             return console.log(error);
         }
         //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
       });
   })
 } else {
   res.json({ success: false, userResult: userResult, emailResult: emailResult });
 }
});

app.post('/users', async (req, res) => {
  const userResult = await User.findOne({ username: req.body.username });
  const emailResult = await User.findOne({ email: req.body.useremail });
  if (!userResult && !emailResult) {
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
    res.json({ success: false, userResult: userResult, emailResult: emailResult });
  }
  //}).catch(err => console.log("get user", err));
});

app.get('/users', (req, res) => {
  User.find().then(user => res.json(user))
});

app.get('/users/:_id', (req, res) => {
  User.findOne({ _id: req.params._id })
    .then(user => {
      if (!user) {
        res.json({ success: false })
      }
      else { res.json(user) }
    }).catch(
      err => {
        console.log("find one user", err)
      }
    )

})

app.put('/removeContact/:_id', async (req, res) => {
  const contactId = req.body.contId.toString();
  const channelId = req.body.channelId.toString();
  let resultContact = await User.updateOne(
    { _id: req.params._id },
    { $pull: { contact: contactId, channel: req.body.channelId } }
  )
  .catch((err) => console.log("err", err));
  res.json({ resultContact });
  const checkIfIExistOnMyContact = await User.findOne(
    { _id: contactId, contact: req.params._id }
  );
  if(!checkIfIExistOnMyContact){
    const deleteChannelResult = await channel.deleteOne(
      { _id: channelId }
    )
    const deleteMessagesResult = await ChatMessage.deleteMany(
      { channel: channelId }
    )
  };
});

app.get('/checkChannel/:_id', async (req, res) => {
  console.log("checkt member id!!!!!!!!", req.params._id);
  const checkChannelResult = await channel.findOne(
    { members: req.params._id}
  )
    .catch((err) => console.log("check channel member err", err));
    res.json({ checkChannelResult });
}) 

app.get('/logout', (req, res) => {
  delete req.session.userId;
  res.json({ success: 'Successfully logged out' })
})

app.get('/login', (req, res) => {
  User.findById(req.session.userId)
    .then(user => {
      if (user) {
        res.json({ loggedIn: true, user: user });
        channel.findOne({channelname: user._id + "system"}).then(data=>{
          systemChannel = data._id;})
       
      } else {
        res.json({ loggedIn: false })
      }
    }).catch(err => {
      console.log("login err", err);
    })
});

app.post('/check-mail', async (req, res) => {
  User.findOne({ email: req.body.email }).then(user => res.json(user))
});

app.post('/login', (req, res) => {

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        res.json({ success: false })
      } else {
        channel.findOne({channelname: user._id + "system"}).then(data=>{
          systemChannel = data._id;})
        const hash = hasha(
          req.body.password + global.passwordSalt,
          { encoding: 'base64', algorithm: 'sha512' }
        );
        console.log(hash, user.password);
        if (user.password === hash) {
          req.session.userId = user._id;
          req.session.loggedInUser = user;
          res.json({ success: true, user: user })
        } else {
          res.json({ success: false, message: hash })
        }
      }
    }).catch(err => {
      console.log("err", err);
    })
});

app.put('/updateAdmin/:_id', async (req, res) => {
  console.log("updateAdmin", req.body.adminId);
  let resultChannel = channel.findOneAndUpdate(
    { _id: req.params._id },
    { $push: { admin: req.body.adminId } }
  )
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      throw err;
    });
})

app.put('/users/:_id', async (req, res) => {
  if (req.body.contact) {
    const userToCheck = await User.findOne( 
      {_id: req.params._id, contact: req.body.contact}
    );
    if(!userToCheck){
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
    };
  };
  if (!req.body.contact) {
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { channel: req.body.channel, group: req.body.group } }
    )
      .then(() => {
        res.json({ success: true })
      })
      .catch(err => {
        throw err;
      });
  };
});

app.put('/channel/:_id', (req, res) => {
  channel.update(
    { _id: req.params._id },
    { $set: { members: req.body.members } }
  )
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      throw err;
    });
});

app.get('/channel/:_id', (req, res)=>{
  channel.findById(req.params._id).then(data=>{
    res.json(data)
  }).catch(err=>console.log(err))
})








app.put('/users/:_id/add', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $push: { channel: req.body.channel } }
  )
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      throw err;
    });
});

app.put('/users/:_id/remove', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { channel: req.body.channel } }
  )
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      throw err;
    });
});

app.put('/memberChannels/:_id', async (req, res) => {
  let resultChannel = await channel.update(
    { _id: req.params._id },
    { $pull: { members: mongoose.Types.ObjectId(req.body.userid) } },
    { multi: true }
  ).catch((err) => console.log("err", err));
  let resultUser = await User.update(
    { _id: req.body.userid },
    { $pull: { channel: mongoose.Types.ObjectId(req.params._id) } }
  ).catch(err => console.log("err", err))
  res.json({ resultChannel, resultUser });
});

app.put('/removeAdmin/:_id', async (req, res) => {
  let resultAdmin = await channel.update(
    { _id: req.params._id },
    { $pull: { admin: mongoose.Types.ObjectId(req.body.userid) } },
    { multi: true }
  ).catch((err) => console.log("err", err));
  res.json({ resultAdmin });
});

app.delete('/removeGroup/:_id', (req, res) => {
  channel.findOneAndRemove(
    { _id: req.params._id }
  )
    .then(result => {
      res.json(result)
    })
})

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

app.put('/users/:_id/setting/password', (req, res) => {
  //console.log(req.body.password);
  User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { password: req.body.password } }
  )
    .then(user => {
      //console.log(user);
      if (user) {
        res.json({ success: true, user });
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

app.put('/message/:id',(req, res)=>{
 
  ChatMessage.findOneAndUpdate(
    {_id: req.params.id},
    {$set: { unread: false}}
  ).then(()=>
    res.json({success: true}
  )).catch(err=>{
    throw err;
  })
});


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



const Repo = require('./classes/Repo.class');
new Repo(app);
// Create a system user to send system message.
var allUsers=[];
 User.find().then(users=>{
   users.forEach(u=>{
     allUsers.push(u._id);
   });
 }
 )

User.findOne({username: "system"}).then(async (data)=>{
  //If users db didn't fine username: "system", create one
  if(!data){
    await new User({
      username: "system",
      nickname: "System Message"
    }).save().then(user => {ai= user._id})

    // Create channels between system and users. 
    //These channels are used to save system messages.
    allUsers.forEach(user=>{
      new channel({
        channelname: user + "system",
        open: true,
        group: false,
      }).save().then((c)=>{
        User.findOneAndUpdate(
          { _id: user},
          { $push: { channel: c._id}}
          ).catch(err=>{
            throw err;
          });
        User.findOneAndUpdate(
          {_id: ai},
          {$push: { channel: c._id}}
        ).catch(err=>{
          throw err;
        });
      }).catch(err=> {throw err})
    })

  }
  else{
    ai = data._id;
  }
})