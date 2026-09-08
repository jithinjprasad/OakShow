const http = require('http');

const urls = [
  '/Lanterns.html',
  '/LanternsS1.html',
  '/LanternsS1E04.html',
  '/blog/30-feel-good-films-to-watch-during-lockdown.html',
  '/Upcoming.html',
  '/indian.html'
];

urls.forEach(u => {
  http.get('http://localhost:3000' + u, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      console.log(u, '=>', res.statusCode, 'root:', data.includes('id="root"'), 'main.jsx:', data.includes('src/main.jsx'));
    });
  });
});
