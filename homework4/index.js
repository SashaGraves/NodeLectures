const express = require('express');
const mongoose = require('mongoose');

const port = 8080;
const app = express();

mongoose.connect('mongodb://127.0.0.1/nodelect');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const UserSchema = new mongoose.Schema(
  {name: String,
  IP: String}
);
const User = mongoose.model('User', UserSchema);

let names = [];
User.find({}, 'name IP', function(err, usersList) {
  if (err) {
    console.log(err);
  } else {
    console.log(usersList)
    names = usersList;
  }
});

const checkRequest = (req, res, next) => {
  const headerIsValid = req.headers['iknowyoursecret'] === 'TheOwlsAreNotWhatTheySeem';
  if (!req.query.name || !headerIsValid) {
    res.send('Do you know my secret?');
  } else {
    next();
  }
};

const greetingResponse = (req, res, next) => {
  const client = {
    name: req.query.name,
    IP: req.ip,
  };
  
  const user = new User(client);
  user.save(function(err) {if (err) return console.log(err)});
  
  const messageList = names.map((item) => `Hello, ${item.name} with IP ${item.IP}!`);
  res.send(messageList.join(" "));
};

app.post('/', checkRequest, greetingResponse);

app.listen(port, () => {
  console.log('Server listening on 8080 port')
});
