const express = require('express');
const fs = require('fs');
const port = 8080;
const dbNames = "./names.json"
const app = express();

let names = [];
if (fs.existsSync(dbNames)) {
  names = JSON.parse(fs.readFileSync(dbNames, "utf8"));
  console.log(names);
};

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
  names.push(client);
  fs.writeFile(dbNames, JSON.stringify(names), (err) => {
    if (err) {
      throw err;
    }
  });
  const messageList = names.map((item) => `Hello, ${item.name} with IP ${item.IP}!`);
  res.send(messageList.join(" "));
};

app.post('/', checkRequest, greetingResponse);

app.listen(port, () => {
  console.log('Server listening on 8080 port')
});
