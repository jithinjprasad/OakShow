const fs = require('fs');

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function tryUpload(name, keyInUrl, rawKey) {
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${keyInUrl}`;
  const filePath = 'e:/OakShow/public/' + rawKey;
  const buf = fs.readFileSync(filePath);

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'image/jpeg'
    },
    body: buf
  });

  const text = await res.text();
  console.log(`[${name}] status: ${res.status}, response: ${text.slice(0, 100)}`);
  if (res.ok) {
    // Check if live site serves it
    const liveRes = await fetch(`https://oakshow.in/${encodeURI(rawKey)}`, { method: 'HEAD' });
    console.log(`  Live site status: ${liveRes.status}`);
  }
}

async function run() {
  const rawKey = "pics/Films/Don't Breathe/1.jpg";

  // Variation 1: raw path (slashes unencoded)
  // encode each segment with encodeURIComponent
  const segEncoded = rawKey.split('/').map(s => encodeURIComponent(s)).join('/');
  await tryUpload('segment-encodeURI', segEncoded, rawKey);

  // Variation 2: full encodeURIComponent (slashes %2F)
  await tryUpload('full-encodeURIComponent', encodeURIComponent(rawKey), rawKey);

  // Variation 3: encodeURIComponent with ' replaced by %27
  const rfc3986 = encodeURIComponent(rawKey).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
  await tryUpload('rfc3986-full', rfc3986, rawKey);

  // Variation 4: segment RFC3986 (slashes kept)
  const rfc3986Seg = rawKey.split('/').map(s => encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())).join('/');
  await tryUpload('rfc3986-segments', rfc3986Seg, rawKey);

  // Variation 5: query param or header? Does Scalix storage API support key as query param?
  // e.g. /objects?key=...
  const queryUrl = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects?key=${encodeURIComponent(rawKey)}`;
  const resQ = await fetch(queryUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'image/jpeg'
    },
    body: fs.readFileSync('e:/OakShow/public/' + rawKey)
  });
  console.log('[query-param] status:', resQ.status, (await resQ.text()).slice(0, 100));
}

run().catch(console.error);
