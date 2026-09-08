const fs = require('fs');
const API_KEY = 'scalix_at_1O1s1r3G283Q402l0U2Z1N2z3o37090k2G1S2M080h382a0M3Q0X0Z453x1Q0X1e';
const PROJ_ID = '408d193f-88ad-4b4c-bcea-587580f4f877';
const BUCKET = 'oakshow-media';
const rawKey = "pics/Films/Don't Breathe/1.jpg";
const url = 'https://api.scalix.world/v1/storage/buckets/' + BUCKET + '/objects/' + encodeURIComponent(rawKey);
fetch(url, {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ' + API_KEY,
    'X-Project-Id': PROJ_ID,
    'Content-Type': 'image/jpeg'
  },
  body: fs.readFileSync('e:/OakShow/public/' + rawKey)
}).then(r => r.text()).then(t => console.log(JSON.stringify(JSON.parse(t), null, 2)));
