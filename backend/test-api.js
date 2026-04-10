const http = require('http');

const data = JSON.stringify({
  email: 'samuel@email.com',
  password: 'Password123!'
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  },
  (res) => {
    let result = '';
    res.on('data', (chunk) => {
      result += chunk;
    });
    res.on('end', () => {
      console.log('STATUS:', res.statusCode);
      console.log('BODY:', result);
    });
  }
);

req.on('error', (e) => {
  console.error('Problem with request:', e.message);
});

req.write(data);
req.end();
