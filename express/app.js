/*
  The express app is a global called app
  It can respond on all routes under /api
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tjatt', { useNewUrlParser: true });
const db = mongoose.connection;
const bodyParser = require('body-parser');
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


// Add requires of different routes here
app.use(bodyParser.json({extended: false}));
require('./routes/addRepo')(app);
// add additional requires in the same style as the previous line here
require('./routes/updateRepo')(app);
require('./routes/getBranch')(app);
require('./routes/startGitApp')(app);
require('./routes/deleteGitApp')(app);



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
    serveClient: false,
  }
);


// Use shared session middleware for socket.io
io.use(sharedsession(session, {
  autoSave: true
}));



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



io.on('connection', (socket) => {


  let user = socket.handshake.session.loggedInUser;







  socket.on('online', (userId) => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    console.log("online before push", onlineUsers)
    onlineUsers.push(userId)
    console.log("online after push", onlineUsers)
    console.log("onlineuser", onlineUsers)
    console.log("online message received")

    socket.emit('online', {
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
      latestUpdateTime: 315529200000 // set default date with milliseconds('1980/01/01')
    }).save().then((c) => {
      User.findOneAndUpdate(
        { _id: user._id },
        { $push: { channel: c._id } }
      ).catch(err => {
        throw err;
      });
      User.findOneAndUpdate(
        { _id: ai },
        { $push: { channel: c._id } }
      ).catch(err => {
        throw err;
      });
    }).catch(err => { throw err });

    socket.broadcast.emit('sign up', {
      username: socket.username
    });
  })


  socket.on('login', (userId) => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    onlineUsers.push(userId)

    User.findOne({ _id: userId }).then(u => {
      let channels = u.channel;
      for (let channel of channels) {
        if (channel) {
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
      socket.emit('online', onlineUsers )
    })
  })


 

  socket.on('delete message', ({ channelId, messageId }) => {
    io.to(channelId).emit('delete message', messageId)
  })


  socket.on('logout', (userId) => {
    onlineUsers = onlineUsers.filter(id => id !== userId);
    console.log("user logout", userId, onlineUsers)
    socket.broadcast.emit('logout', {
      loginUser: onlineUsers
    })
  })

  socket.on('join channel', channel => {
    socket.join(channel, () => console.log('received channel', socket.rooms));
  })

  socket.on('invitation', data => {
    socket.join(data.targetChannel);
  })

  socket.on('acceptance', data => {
    socket.join(data.targetChannel)
  })

  socket.on('system', async (data) => {

    //create group channel 
    // data: {newChannel: whole channel info includes id, creater:userId}
    

    if (data.type === "create group") {
      console.log("create group", data)
      socket.join(data.newChannel._id);
      // socket.join(data.newChannel._id, async () => {
      //   console.log("socket room", socket.rooms);
      let messageDict = {};
      for (let member of data.newChannel.members) {
        if (member !== user._id) {
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
          let mes = "";
          await systemMessage.save().then(message => {
            mes = message._id;
            messageDict[member] = mes;
          })
        }
      }

      let message = {
        textType: "addedToGroup",
        initiator: data.creater,
        targetChannel: data.newChannel,
        unread: true,
        addedMembers: data.newChannel.members,
        messageDict: messageDict,
      }

      socket.broadcast.emit('group', message);
    }



    //contact channel invitation


    if (data.type === "inviation") {
      // data:  {newChannel: id, invitee: userId, inviter: user._id, type:"inviation"}
      let c = await channel.findOne({ channelname: data.invitee + "system" });
      let systemMessage = new ChatMessage({
        sender: data.invitee,
        text: data.inviter + "&ask&" + data.invitee + "&toJoin&" + data.newChannel._id,
        textType: "invitation",
        unread: true,
        channel: c._id,
      });
      let m = "";
      await systemMessage.save().then(message => {
        m = message._id;
      })
      let message = {
        textType: "invitation",
        initiator: data.inviter,
        targetChannel: data.newChannel._id,
        invitee: data.invitee,
        unread: true,
        id: m,
      }

      socket.broadcast.emit('invitation', message);
    }



    if (data.type === 'acceptance') {
      console.log('acceptance', data);
      //data: {accepter: id, acceptee: id, targetChannel: channelId, type:"acceptance" }
      let c = await channel.findOne({ channelname: data.acceptee.toString() + "system" });
      let systemMessage = new ChatMessage({
        sender: data.accepter,
        text: data.accepter + "&accept&" + data.acceptee + "&toJoin&" + data.targetChannel,
        textType: 'acceptance',
        unread: true,
        channel: c._id,
      })
      let m = "";
      await systemMessage.save().then(message => {
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
        { _id: data.targetChannel },
        { $set: { open: true } }
      ).then((data) => {
        console.log(data)
      })
        .catch(err => {
          throw err;
        });

      socket.broadcast.emit('acceptance', message);
    }

    if (data.type === 'rejection') {
      console.log("rejection", data);
      // data: {rejecter: id, rejectee: id, type:'rejection'}
      // rejecter emit rejection
      let c = await channel.findOne({ channelname: data.rejectee.toString() + "system" });
      let systemMessage = new ChatMessage({
        sender: data.rejecter,
        text: data.rejecter + "&reject&" + data.rejectee,
        textType: "rejection",
        unread: true,
        channel: c._id,
      })
      let m = "";
      await systemMessage.save().then(message => {
        m = message._id;
      })
      let message = {
        textType: "rejection",
        initiator: data.rejecter,
        rejectee: data.rejectee,
        unread: true,
        id: m,
      }

      socket.broadcast.emit('rejection', message);

    }

    if (data.type === "editMembersInGroup") {
      console.log("edit", data);
      //data:  { targetChannel: whole channel info
      // initiator: this.props.userStore.user._id,
      // addedMembers: addedUser,
      // removedMembers: removedUser,
      // type: "editMembersInGroup"}
      socket.join(data.targetChannel._id);

      if (data.addedMembers.length > 0) {
        let promises=[];
        let messageDict = {};

       for (let m of data.addedMembers) {
          let c = await channel.findOne({ channelname: m.toString() + "system" });
          //systemMessage
          let systemMessage = new ChatMessage({
            sender: data.initiator,
            text: data.initiator + "&inviteYouToChannel&" + data.targetChannel.channelname,
            textType: "addedToGroup",
            unread: true,
            channel: c._id,
          });

          let p = systemMessage.save()
          promises.push(p);

          p.then(message => {
            mes = message._id;
            messageDict[m] = mes;
          })

          let name = ""
          //save name of edit member
          User.findById(m).then(user => {
            let gms = [];
            name = user.nickname;
            //broadcast in grup channel as groupInfo 
            let groupMessage = new ChatMessage({
              sender: data.initiator,
              text: "Welcome " + name + "!",
              channel: data.targetChannel._id,
              textType: "groupInfo",
              time: data.time,
            })
            groupMessage.save();
            gms.push(groupMessage);

            io.to(data.targetChannel._id).emit('chat message', gms);
          })



        }
        Promise.all(promises).then(()=>{
          let message = {
            textType: "addedToGroup",
            initiator: data.initiator,
            targetChannel: data.targetChannel,
            unread: true,
            addedMembers: data.addedMembers,
            messageDict: messageDict,
          }
  
          socket.broadcast.emit('group', message);
        }
          
        )
        


      }

      if (data.removedMembers.length > 0) {
        let messageDict = {};

        for (let m of data.removedMembers) {
          let c = await channel.findOne({ channelname: m.toString() + "system" });
          let systemMessage = new ChatMessage({
            sender: data.initiator,
            text: data.initiator + "&hasRemovedYouFromChannel&" + data.targetChannel.channelname,
            textType: "removeFromGroup",
            unread: true,
            channel: c._id,
          });
          let mes = "";
          await systemMessage.save().then(message => {
            mes = message._id;
            messageDict[m] = mes;
          })

          let name = "";
          // save name of deleted memeber
          User.findById(m).then(user => {
            name = user.nickname;
            let gms = [];
            let groupMessage = new ChatMessage({
              sender: data.initiator,
              text: name + " has been removed from this group!",
              channel: data.targetChannel._id,
              textType: "groupInfo",
              time: data.time,
            })

            groupMessage.save();
            gms.push(groupMessage);

            io.to(data.targetChannel._id).emit('chat message', gms);
          })


        }

        let message = {
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

    if (data.type === "makeAdmin") {
      // data: targetChannel: whole channel, admin: id, sender:id, type:makeAdmin
      let c = data.targetChannel._id;
      socket.join(c);
      let m = [];
      User.findById(data.admin).then(user => {
        let groupMessage = new ChatMessage({
          sender: data.sender,
          text: user.nickname + " is now admin.",
          textType: "groupInfo",
          channel: c,
          time: data.time,
        })
        groupMessage.save();
        m.push(groupMessage);
        socket.broadcast.emit('group', groupMessage);
        io.to(c).emit('chat message', m);
      })
    }

    if (data.type === "removeAdmin") {
      let c = data.channel._id;
      socket.join(c);
      let m = [];
      User.findById(data.admin).then(user => {
        let groupMessage = new ChatMessage({
          sender: data.sender,
          text: user.nickname + " is no longer group admin.",
          textType: "groupInfo",
          channel: c,
          time: data.time,
        })
        groupMessage.save();
        m.push(groupMessage);
        socket.broadcast.emit('group', groupMessage);
        io.to(c).emit('chat message', m);
      });

    }

    if (data.type === "leaveGroup") {
      let c = data.channel._id;
      socket.join(c);
      let m = [];
      User.findById(data.sender).then(user => {
        let groupMessage = new ChatMessage({
          sender: data.sender,
          text: user.nickname + " has left group",
          textType: "groupInfo",
          channel: c,
          time: data.time,
        })
        groupMessage.save();
        m.push(groupMessage);

        io.to(c).emit('chat message', m);
      });
    }

    if (data.type === "removeContact") {
      console.log("remove contact", data)
      let c = await channel.findOne({ channelname: data.target + "system" });
      let user = await User.findById(data.sender);
      let systemMessage = new ChatMessage({
        sender: data.sender,
        text: user.nickname,
        textType: "removeContact",
        channel: c,
        unread: true,
        time: data.time,
      })
      let m = "";
      systemMessage.save().then(message=>{
        m= message.id;
      })
      let message= {
        sender: data.sender,
        initiator: user.nickname,
        target: data.target,
        textType: "removeContact",
        id: m,
      }
      socket.broadcast.emit('removeContact',message);
      //io.to(c).emit('chat message', m);
    };
  })
















  socket.on('chat message', async (messageFromClient) => {

    let _id = messageFromClient._id;
    let time = messageFromClient.time;
    let c = messageFromClient.channel;
    socket.join(c);

    if (messageFromClient.isGif) {
      messageFromClient.originalName = messageFromClient.originalName.split("GIF by")[0];
      let newMessage = new ChatMessage({
        sender: messageFromClient.sender,
        channel: messageFromClient.channel,
        filePath: messageFromClient.filePath,
        contentType: messageFromClient.contentType,
        originalName: messageFromClient.originalName,
        star: false,
        unread: true,
      })
      await newMessage.save();
      _id = newMessage._id;
      time = newMessage.time;
    }

    // Create a mongoose ChatMessage and write to the db
    if (messageFromClient.contentType === 'text') {
      let message = new ChatMessage({
        ...messageFromClient,
      });
      await message.save();
      _id = message._id;
      time = message.time;
    }
    // Send the message to all the sockets in the channel
    io.to(c).emit('chat message', [{
      _id: _id,
      sender: messageFromClient.sender,
      text: messageFromClient.text,
      channel: messageFromClient.channel,
      textType: messageFromClient.textType,
      contentType: messageFromClient.contentType,
      filePath: messageFromClient.filePath,
      originalName: messageFromClient.originalName,
      star: messageFromClient.star,
      unread: true,
      time: time,
    }]);


  });



  socket.on('rejection', async (data) => {
    data.textType = 'rejection';
    socket.broadcast.emit('system', data);
    let c = await channel.findOne({
      channelname: data.rejectee + "system"
    });
    let systemMessage = new ChatMessage({
      sender: data.rejecter,
      text: data.rejecter + "&decline&" + data.rejectee,
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

app.get('/system', (req, res) => {
  res.json({ systemChannel: systemChannel, systemUserId: ai })

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
app.post('/mail-password', async function (req, res, next) {
  const password = [...Array(10)].map(_ => (Math.random() * 36 | 0).toString(36)).join``;
  console.log('new password = ', password);
  const hash = await hasha(
    password + global.passwordSalt,
    { encoding: 'base64', algorithm: 'sha512' }
  );
  let updateResult = await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: hash } }
  )

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tjatt.info@gmail.com',
      pass: 'tj@tt@WUMA17'
    },
    tls: {
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
        tls: {
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
  if (!checkIfIExistOnMyContact) {
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
    { members: req.params._id }
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
        channel.findOne({ channelname: user._id + "system" }).then(data => {
          systemChannel = data._id;
        })

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
        channel.findOne({ channelname: user._id + "system" }).then(data => {
          systemChannel = data._id;
        })
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
      { _id: req.params._id, contact: req.body.contact }
    );
    if (!userToCheck) {
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

app.delete('/killChannel/:id', (req, res) => {
  channel.findOneAndRemove(
    { _id: req.params.id}
  ).then(channel => {
    res.json(channel);
  });
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

app.put('/channel/:_id/updatetime', (req, res) => {
  console.log("request", req)
  channel.update(
    { _id: req.params._id },
    { $set: { latestUpdateTime: req.body.time } }
  )
    .then(() => {
      res.json({ success: true })
      console.log("ooooooo", res)
    })
    .catch(err => {
      throw err;
    });
});

app.get('/channel/:_id', (req, res) => {
  channel.findById(req.params._id).then(data => {
    res.json(data)
  }).catch(err => console.log(err))
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

app.put('/message/:id', (req, res) => {

  ChatMessage.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { unread: false } }
  ).then(() =>
    res.json({ success: true }
    )).catch(err => {
      throw err;
    })
});

app.delete('/deletemessage/:messageId', (req, res) => {
  console.log(req.params._id);
  ChatMessage.findOneAndRemove({ _id: req.params.messageId })
    .then(() => {
      res.json({ success: true })
    })
})


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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/fileUploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + pathTo.extname(file.originalname))
  }
});
const fileUpload = multer(
  {
    storage: fileStorage,
    limits: {
      // max size of files 10mb
      fileSize: 10000000
    }
  });

app.post('/fileUpload/:id', fileUpload.single('file'), async (req, res) => {
  if (!req.session.userId) {
    return res.status(403)
  }
  if (!req.file) {
    return res.status(400)
  }

  const imageMimeTypes = ['jpeg', 'jpg', 'png', 'gif'];
  const fileIsImage = imageMimeTypes.includes(req.file.mimetype.split('/')[1]);

  let message = new ChatMessage({
    sender: req.session.userId,
    contentType: fileIsImage ? 'image' : 'file',
    filePath: req.file.path.split('public')[1],
    channel: req.params.id,
    originalName: req.file.originalname
  })
  await message.save()
  res.json(message);
})

const codeUpload = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter: (req, file, cb) => {
    const approved = file.originalname.match(/\.(js|py|html|css|scss|sass|less|php|json|xml)$/)
    if (!approved) {
      console.log('File is not a codefile')
      return cb(null, false)
    }
    cb(null, true)
  }
});

app.post('/codeUpload/:id', codeUpload.single('file'), async (req, res) => {
  if (!req.session.userId) {
    return res.status(403)
  }

  if (req.body.isText) {

    let message = new ChatMessage({
      sender: req.session.userId,
      contentType: 'code',
      channel: req.params.id,
      text: req.body.code
    });
    await message.save();
    return res.json(message);
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Fail' })
  }

  let message = new ChatMessage({
    sender: req.session.userId,
    contentType: 'code',
    channel: req.params.id,
    originalName: req.file.originalname,
    text: req.file.buffer
  });
  console.log('Success')
  await message.save();
  res.json(message);
});


const Repo = require('./classes/Repo.class');
new Repo(app);
// Create a system user to send system message.
var allUsers = [];
User.find().then(users => {
  users.forEach(u => {
    allUsers.push(u._id);
  });
}
)

User.findOne({ username: "system" }).then(async (data) => {
  //If users db didn't fine username: "system", create one
  if (!data) {
    await new User({
      username: "system",
      nickname: "System Message"
    }).save().then(user => { ai = user._id })

    // Create channels between system and users. 
    //These channels are used to save system messages.
    allUsers.forEach(user => {
      new channel({
        channelname: user + "system",
        open: true,
        group: false,
      }).save().then((c) => {
        User.findOneAndUpdate(
          { _id: user },
          { $push: { channel: c._id } }
        ).catch(err => {
          throw err;
        });
        User.findOneAndUpdate(
          { _id: ai },
          { $push: { channel: c._id } }
        ).catch(err => {
          throw err;
        });
      }).catch(err => { throw err })
    })

  }
  else {
    ai = data._id;
  }
})