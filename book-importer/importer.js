const usersJson = require('./test-users.json');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/tjatt');
const db = mongoose.connection;
db.on('error', (e) => {
  console.error(e);
});
db.once('open', () => {
  console.info('db connected');
});

const User = require('../express/classes/User.class');
const userModel = new User(app).myModel;

// Empty collentions
userModel.remove({}, async () => {
  await saveUser().then(() => {
    console.log('Users imported!')
    process.exit();
  });
})

const saveUser = () => {
  usersJson.forEach(item => {
    const user = new userModel(item);
    user.save().then(item => {
      console.log(`${item.name} is saved`);
    });
  });
}