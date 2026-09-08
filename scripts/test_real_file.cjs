const fs = require('fs');
const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function testReal() {
  const filePath = "e:/OakShow/public/pics/Films/Don't Breathe/1.jpg";
  const buf = fs.readFileSync(filePath);

  // If we upload with encoded special chars:
  // Key in URL: pics/Films/Don%2527t%20Breathe/1.jpg
  // In Scalix, the key becomes: pics/Films/Don%27t Breathe/1.jpg
  const uploadKey = encodeURIComponent("pics/Films/Don't Breathe/1.jpg").replace(/'/g, '%2527');
  const putUrl = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${uploadKey}`;

  console.log('PUT URL:', putUrl);
  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'image/jpeg'
    },
    body: buf
  });
  console.log('PUT status:', putRes.status);

  // Now test fetching from oakshow.in
  const fetchUrl1 = "https://oakshow.in/pics/Films/Don%27t%20Breathe/1.jpg";
  const res1 = await fetch(fetchUrl1);
  console.log(`Fetch ${fetchUrl1} -> status: ${res1.status}, type: ${res1.headers.get('content-type')}, len: ${res1.headers.get('content-length')}`);

  const fetchUrl2 = "https://oakshow.in/pics/Films/Don't%20Breathe/1.jpg";
  const res2 = await fetch(fetchUrl2);
  console.log(`Fetch ${fetchUrl2} -> status: ${res2.status}, type: ${res2.headers.get('content-type')}, len: ${res2.headers.get('content-length')}`);
}

testReal();
