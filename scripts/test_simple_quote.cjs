const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function testKey(keyName) {
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${encodeURIComponent(keyName)}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'text/plain'
    },
    body: 'hello'
  });
  console.log(`Key: "${keyName}" -> Status: ${res.status}`);
  if (res.ok) {
    // delete it to clean up
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
  await testKey('test-simple.txt');
  await testKey('test space.txt');
  await testKey("test'quote.txt");
  await testKey('test+plus.txt');
  await testKey('test!excl.txt');
  await testKey('test$dollar.txt');
  await testKey('test@at.txt');
  await testKey('test&amp.txt');
  await testKey('test(paren).txt');
}
run();
