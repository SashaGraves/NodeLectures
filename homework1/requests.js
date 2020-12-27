const http = require('http');

const getRequest = http.get({ port: 8080 }, (response) => {
  console.log('Hurray! Response for GET received!');
  response.on('data', (d) => {
    process.stdout.write(d + '\n\n');
  })
});

const postData = 'Hello there on port 8080!';
const options = {
  port: 8080,
  method: 'POST'
};

const postRequest = http.request(options, (response) => {
  console.log('POST is sent');
  response.on('data', (d) => {
    process.stdout.write(d + '\n\n');
  })
});

postRequest.write(postData);
postRequest.end();

const loveOptions = {...options, headers: {
  'WhatWillSaveTheWorld': 'Love',
}};
const postRequestLove = http.request(loveOptions, (response) => {
  console.log('POST is sent');
  response.on('data', (d) => {
    process.stdout.write(d + '\n\n');
  })
});

postRequestLove.write(postData);
postRequestLove.end();