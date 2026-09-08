import * as cheerio from 'cheerio';

const DOMAIN = 'https://oakshow.in';

async function verifyLive() {
  console.log('=== Verifying OakShow Live Website Images ===\n');

  // 1. Fetch homepage
  console.log(`Fetching homepage from ${DOMAIN}...`);
  const homeRes = await fetch(DOMAIN);
  const homeHtml = await homeRes.text();
  console.log(`Homepage status: ${homeRes.status} (${homeHtml.length} bytes)`);

  const $ = cheerio.load(homeHtml);
  const imagesToCheck = new Set();

  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && !src.startsWith('data:')) {
      imagesToCheck.add(src.startsWith('http') ? src : `${DOMAIN}/${src.replace(/^\/+/, '')}`);
    }
  });

  // Also test standard images across categories
  const testPaths = [
    '/pics/Films/102NotOut/1.jpg',
    '/pics/Films/AvengersEndgame/1.jpg',
    '/pics/Films/Dangal/1.jpg',
    '/pics/Films/Baahubali The Conclusion/1.jpg',
    '/pics/Films/Digger/1.jpg',
    '/pics/Films/Bigil/1.jpg',
    '/pics/Films/Lucifer/1.jpg',
    '/pics/Films/Master/1.jpg',
    '/pics/Films/Petta/1.jpg',
    '/pics/Films/Kaithi/1.jpg',
    '/pics/Serieses/GameofThrones/1.jpg',
    '/pics/Serieses/MoneyHeist/1.jpg',
    '/pics/Serieses/StrangerThings/1.jpg',
    '/pics/Serieses/Chernobyl/1.jpg',
    '/pics/RatingSiteLogos/rotten-tomatoes-certified-fresh.png',
    '/pics/RatingSiteLogos/imdb.png',
    '/pics/BookngWebSiteLogos/book-my-show.png',
    '/pics/BookngWebSiteLogos/pvr.png',
    '/pics/WatchOnline/netflix.png',
    '/pics/WatchOnline/amazon-prime.png',
    '/pics/WatchOnline/hotstar.png',
    '/Galleries/pics/pranitha-subhash/1.jpg',
    '/Profiles/CriticProfiles/AbhijithAG/pics/1.jpg',
    '/Profiles/CriticProfiles/JithinJPrasad/pics/1.jpg',
    '/Profiles/CriticProfiles/AbhijithAG/pics/abhijith-a-g-character-icon.png',
    '/favicon.png',
    '/favicon.ico'
  ];

  for (const p of testPaths) {
    imagesToCheck.add(`${DOMAIN}${p}`);
  }

  console.log(`Testing ${imagesToCheck.size} distinct image URLs across categories...\n`);

  let success = 0;
  let failed = 0;

  for (const url of imagesToCheck) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type');
      const contentLength = res.headers.get('content-length');
      const isImage = contentType && (contentType.startsWith('image/') || contentType.includes('icon'));

      if (res.ok && isImage) {
        success++;
        console.log(`[PASS ${res.status}] ${contentType.padEnd(16)} ${(contentLength || 'chunked').padEnd(10)} ${url}`);
      } else {
        failed++;
        console.error(`[FAIL ${res.status}] Content-Type: ${contentType} ${url}`);
      }
    } catch (err) {
      failed++;
      console.error(`[ERROR] ${url}: ${err.message}`);
    }
  }

  console.log(`\n=== VERIFICATION SUMMARY ===`);
  console.log(`Total Tested: ${imagesToCheck.size}`);
  console.log(`Passed (200 OK): ${success}`);
  console.log(`Failed: ${failed}`);
}

verifyLive().catch(err => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
