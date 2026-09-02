const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log('HTTP Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('HTML Body Length:', data.length);
    console.log('Contains root div:', data.includes('id="root"'));
    console.log('Contains main.jsx bundle:', data.includes('src/main.jsx'));
  });
}).on('error', (err) => {
  console.error('Connection failed:', err.message);
});
