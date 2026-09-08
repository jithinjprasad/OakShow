import fs from 'fs';

const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';

async function tryUpload(key, rawKey) {
  const url = `https://api.scalix.world/v1/storage/buckets/${BUCKET}/objects/${key}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Project-Id': PROJ_ID,
      'Content-Type': 'text/plain'
    },
    body: 'test content'
  });
  console.log(`Key: [${rawKey}] -> Status: ${res.status}`);
  if (!res.ok) {
    const txt = await res.text();
    console.log('   Error:', txt.slice(0, 150));
  }
}

async function run() {
  // Test variations for single quote
  await tryUpload("test-quote's.txt", "raw single quote");
  await tryUpload("test-quote%27s.txt", "encoded %27 single quote");
  await tryUpload("test-amp%26.txt", "encoded %26 amp");
  await tryUpload("test-amp&.txt", "raw amp");
  await tryUpload("test-paren(1).txt", "raw paren");
  await tryUpload("test-paren%281%29.txt", "encoded paren");
  await tryUpload("test-excl!.txt", "raw exclamation");
  await tryUpload("test-excl%21.txt", "encoded exclamation");
  await tryUpload("test-dollar$.txt", "raw dollar");
  await tryUpload("test-dollar%24.txt", "encoded dollar");
  await tryUpload("test-plus+.txt", "raw plus");
  await tryUpload("test-plus%2B.txt", "encoded plus");
  await tryUpload("test-at@.txt", "raw at");
  await tryUpload("test-at%40.txt", "encoded at");
}

run();
