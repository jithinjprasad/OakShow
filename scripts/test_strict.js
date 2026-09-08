import fs from 'fs';

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

function strictEncode(str) {
  return encodeURIComponent(str).replace(/[!'()*@]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

async function test() {
  const filePath = "e:/OakShow/public/pics/Films/Don't Breathe/1.jpg";
  const key = "pics/Films/Don't Breathe/1.jpg";
  const encoded = strictEncode(key);
  console.log('Strict encoded key:', encoded);
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${encoded}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'image/jpeg'
    },
    body: fs.readFileSync(filePath)
  });
  console.log('Status:', res.status, await res.text());
}
test();
