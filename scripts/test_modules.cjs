const http = require('http');

function fetchModule(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length, snippet: data.slice(0, 150) }));
    }).on('error', reject);
  });
}

async function run() {
  const main = await fetchModule('/src/main.jsx');
  console.log('GET /src/main.jsx ->', main.status, 'Size:', main.length);

  const app = await fetchModule('/src/versions/AppV3Standalone.jsx');
  console.log('GET /src/versions/AppV3Standalone.jsx ->', app.status, 'Size:', app.length);

  const emergency = await fetchModule('/src/components/EmergencyHub.jsx');
  console.log('GET /src/components/EmergencyHub.jsx ->', emergency.status, 'Size:', emergency.length);

  const emergencyDetail = await fetchModule('/src/components/EmergencyDetailPage.jsx');
  console.log('GET /src/components/EmergencyDetailPage.jsx ->', emergencyDetail.status, 'Size:', emergencyDetail.length);
}

run();
