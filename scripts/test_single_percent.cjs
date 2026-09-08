const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function testSingle() {
  // Test putting with %27 in URL
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/test%27quote.txt`;
  console.log('Sending PUT to:', url);
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'text/plain'
    },
    body: 'content-with-single-percent'
  });
  console.log('Status:', res.status, await res.text());

  // Check what key was created in Scalix
  const listUrl = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects?prefix=test`;
  const listRes = await fetch(listUrl, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID
    }
  });
  console.log('List objects:', await listRes.json());
}

testSingle();
