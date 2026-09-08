const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function testRetrieve() {
  const uploadKey = "test%2527quote.txt";
  const putUrl = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${uploadKey}`;
  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'text/plain'
    },
    body: 'content-of-test-quote'
  });
  console.log('PUT status:', putRes.status);

  // Now test how it can be fetched via live oakshow.in
  const urlsToTest = [
    "https://oakshow.in/test'quote.txt",
    "https://oakshow.in/test%27quote.txt",
    "https://oakshow.in/test%2527quote.txt"
  ];

  for (const u of urlsToTest) {
    try {
      const res = await fetch(u);
      console.log(`Fetch ${u} -> status: ${res.status}`);
      if (res.ok) {
        console.log(`  Body: "${await res.text()}"`);
      }
    } catch (e) {
      console.log(`Fetch ${u} -> error: ${e.message}`);
    }
  }

  // Also test listing the bucket to see what key was stored in Scalix!
  const listUrl = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects?prefix=test`;
  const listRes = await fetch(listUrl, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID
    }
  });
  console.log('List objects:', await listRes.json());
}

testRetrieve();
