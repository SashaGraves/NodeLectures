const express = require('express');
const db = require('./db_connection');

const port = 8080;
const app = express();

let names = [];
db.User.find({}, 'name IP', function(err, usersList) {
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
    console.log('HERE');
    next();
  }
};

const greetingResponse = (req, res, next) => {
  const client = {
    name: req.query.name,
    IP: req.ip,
  };
  
  const user = new db.User(client);
  user.save(function(err) {
    if (err) return console.log(err)
  });
  
  names.unshift(client);
  const messageList = names.map((item) => `Hello, ${item.name} with IP ${item.IP}!`);
  res.send(messageList.join(" "));
};

app.post('/', checkRequest, greetingResponse);

app.listen(port, () => {
  console.log('Server listening on 8080 port')
});
