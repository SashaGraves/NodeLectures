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

app.post('/', requestHandler);

app.listen(port, () => {
  console.log('Server listening on 8080 port')
});

const requestHandler = (req, res) => {
  const queryObject = req.query;
  const headerIsValid = req.headers['iknowyoursecret'] === 'TheOwlsAreNotWhatTheySeem';
  if (queryObject.name && headerIsValid) {
    const client = {
      name: queryObject.name,
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
  } else {
    res.send('And do you know my secret?');
  }
};
