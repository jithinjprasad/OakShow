const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function testDouble(keyInUrl) {
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${keyInUrl}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'text/plain'
    },
    body: 'hello'
  });
  console.log(`URL: "${keyInUrl}" -> Status: ${res.status}`);
  if (res.ok) {
    // delete it
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-Project-Id': PROJ_ID
      }
    });
  }
}

async function run() {
  // Try double encoding: ' is %27, so double is %2527
  await testDouble("test%2527quote.txt");
  // Try plus: + is %2B, double is %252B
  await testDouble("test%252Bplus.txt");
}
run();
