const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 8080;
const dbNames = "names.json"

let names = [];
if (fs.existsSync(dbNames)) {
  names = JSON.parse(fs.readFileSync(dbNames, "utf8"));
  console.log(">>> names read from file:", names);
}

const requestHandler = (request, response) => {
  const methodIsValid = request.method === 'POST';
  const queryObject = url.parse(request.url, true).query;
  const headerIsValid = request.headers['iknowyoursecret'] === 'TheOwlsAreNotWhatTheySeem';
  if (methodIsValid && queryObject.name && headerIsValid) {
    names.push(queryObject.name);
    fs.writeFile(dbNames, JSON.stringify(names), (err) => {
      if (err) {
        throw err;
      }
    })
    response.end(`Hello, ${names.join(", ")}`);
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
