const http = require('http');

const options = {
  port: 8080,
  method: 'POST',
  headers: {
    'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem',
  },
  path: '/?name=Fui'
};

const postRequest = http.request(options, (response) => {
  response.on('data', (d) => {
    process.stdout.write(d + '\n\n');
  })
});

postRequest.end();
