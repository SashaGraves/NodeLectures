const http = require('http');
const port = 8080;

const requestHandler = (request, response) => {
  if (request.method === 'GET') {
    console.log('GET request received')
    response.end('Hi! This is port 8080. Thank you for your GET-request. It is important for me.');
  }
  if (request.method === 'POST') {
    console.log('POST request received');
    header = request.headers;
    console.log(header);
    if (header['whatwillsavetheworld'] === 'Love') {
      console.log(`WhatWillSaveTheWorld?`);
      request.on('data', (d) => {
        process.stdout.write(d);
      });
      response.end(`LOVE Will Save The World`);
    } else {
      request.on('data', (d) => {
        process.stdout.write(d);
      });
      response.end(`Hi! This is port 8080. Received POST-request with data`);
    }
  }
  else {
    response.end(`Received unknown request`)
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('The exception occured', err);
  }
  
  console.log('Server listening on 8080 port');
});
