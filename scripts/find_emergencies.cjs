const fs = require('fs');
const cheerio = require('cheerio');

const files = [
  'InduSarkar.html',
  'San\'75.html',
  'Baadshaho.html',
  'JeenaIsiKaNaamHai.html',
  'SuperSingh.html',
  'OakShowEmergency.html',
  'QuanticoSeason2.html',
  'Adrift.html',
  'Sully.html',
  'TheQuake.html',
  'DeepwaterHorizon.html',
  'Geostorm.html',
  'Greenland.html',
  'emergency/KeralaFloods.html',
  'emergency/KeralaFloods2019.html',
  'emergency/coronavirusoutbreak.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const $ = cheerio.load(fs.readFileSync(f, 'utf-8'));
    console.log('==================================================');
    console.log('FILE:', f);
    
    // Look for emergency mentions
    $('p, h1, h2, h3, h4, h5, div, a, details, summary, table').each((i, el) => {
      const txt = $(el).text();
      if (/emergency|helpline|rescue|control room|disaster|flood|coronavirus/i.test(txt) && $(el).children().length < 3) {
        const cleanTxt = txt.trim().replace(/\s+/g, ' ');
        if (cleanTxt.length > 5 && cleanTxt.length < 300) {
          console.log(`  [${el.tagName}] ${cleanTxt} ${$(el).attr('href') ? '-> ' + $(el).attr('href') : ''}`);
        }
      }
    });
  }
});
