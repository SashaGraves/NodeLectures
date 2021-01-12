const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 8080;
const dbNames = "./names.json"

let names = [];
if (fs.existsSync(dbNames)) {
  names = JSON.parse(fs.readFileSync(dbNames, "utf8"));
  console.log(names);
};

const requestHandler = (request, response) => {
  const methodIsValid = request.method === 'POST';
  const queryObject = url.parse(request.url, true).query;
  const headerIsValid = request.headers['iknowyoursecret'] === 'TheOwlsAreNotWhatTheySeem';
  let clientIP = '';
  if (request.headers['x-forwarded-for']) {
    clientIP = request.headers['x-forwarded-for'][0];    
  } else {
    clientIP = request.connection.remoteAddress;
  }
  if (methodIsValid && queryObject.name && headerIsValid) {
    const client = {
      name: queryObject.name,
      IP: clientIP,
    };
    names.push(client);
    fs.writeFile(dbNames, JSON.stringify(names), (err) => {
      if (err) {
        throw err;
      }
    });
    const messageList = names.map((item) => `Hello, ${item.name} with IP ${item.IP}!`);
    response.end(messageList.join(" "));
  } else {
    response.end('And do you know my secret?');
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('The exception occured', err);
  }
  
  console.log('Server listening on 8080 port');
});
