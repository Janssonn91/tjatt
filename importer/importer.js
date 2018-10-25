// const usersJson = require('./test-users.json');
// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();

// mongoose.connect('mongodb://localhost/tjatt', { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', (e) => {
//   console.error(e);
// });
// db.once('open', () => {
//   console.info('db connected');
// });

// const User = require('../express/classes/User.class');
// const userModel = new User(app).myModel;

// // Empty collentions
// userModel.remove({}, async () => {
//   await saveUser().then(() => {
//     console.log('Users imported!');
//     process.exit();
//   });
// })

// const saveUser = async () => {
//   for (const person of usersJson) {
//     const user = new userModel(person);
//     await user.save().then(item => {
//       console.log(`${item.username} is saved`);
//     });
//   }
// }