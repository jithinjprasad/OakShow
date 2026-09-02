const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('=== EXTRACTING ALL OAKSHOW GALLERIES ===');

const galleryFiles = [
  {
    filename: 'Galleries/2-point-0-all-posters-and-wallpapers.html',
    movieSlug: '2point0',
    movieTitle: '2.0 (2 Point 0)',
    title: '2 Point 0 All HD Posters, Wallpapers, Images and Stills',
    date: 'Nov 24, 2018',
    coverImage: 'pics/Films/2.0/posters/2Point0-35.jpg',
    category: 'Movie Posters & Wallpapers'
  },
  {
    filename: 'Galleries/captain-marvel-all-posters-and-wallpapers.html',
    movieSlug: 'CaptainMarvel',
    movieTitle: 'Captain Marvel',
    title: 'Captain Marvel All Official HD Posters and Wallpapers',
    date: 'Nov 23, 2018',
    coverImage: 'pics/Films/CaptainMarvel/posters/1.jpg',
    category: 'Movie Posters & Wallpapers'
  },
  {
    filename: 'Galleries/comali-all-posters-and-wallpapers.html',
    movieSlug: 'Comali',
    movieTitle: 'Comali',
    title: 'Comali All Official Posters, Wallpapers and Stills',
    date: 'August 01, 2019',
    coverImage: 'pics/Films/Comali/posters/1.jpg',
    category: 'Movie Posters & Wallpapers'
  },
  {
    filename: 'Galleries/ivanukku-engeyo-macham-irukku-all-posters-and-wallpapers.html',
    movieSlug: 'IvanukkuEngeyoMachamIrukku',
    movieTitle: 'Ivanukku Engeyo Macham Irukku',
    title: 'Ivanukku Engeyo Macham Irukku All Posters & HD Wallpapers',
    date: 'Nov 23, 2018',
    coverImage: 'pics/Films/IvanukkuEngeyoMachamIrukku/posters/1.jpg',
    category: 'Movie Posters & Wallpapers'
  },
  {
    filename: 'Galleries/munna-michael-all-posters-and-wallpapers.html',
    movieSlug: 'MunnaMichael',
    movieTitle: 'Munna Michael',
    title: 'Munna Michael All Posters & Wallpapers',
    date: 'July 31, 2018',
    coverImage: 'pics/Films/MunnaMichael/4.jpg',
    category: 'Movie Posters & Wallpapers'
  },
  {
    filename: 'JusticeLeaguePosters.html',
    movieSlug: 'JusticeLeague',
    movieTitle: 'Justice League',
    title: 'Justice League Character Posters & Wallpapers',
    date: 'Nov 15, 2017',
    coverImage: 'pics/Films/JusticeLeague/posters/1.jpg',
    category: 'Character Posters'
  },
  {
    filename: 'KhaidiNo.150KajalStills.html',
    movieSlug: 'KhaidiNo.150',
    movieTitle: 'Khaidi No. 150',
    title: 'Kajal Aggarwal Exclusive Stills From Khaidi No. 150',
    date: 'Jan 11, 2017',
    coverImage: 'pics/Films/KhaidiNo150/1.jpg',
    category: 'Movie Stills & Photoshoot'
  },
  {
    filename: 'Galleries/pranitha-subhash-hot-stills-hd.html',
    movieSlug: '',
    movieTitle: 'Pranitha Subhash',
    title: 'Pranitha Subhash All HD Photoshoot Stills & Wallpapers',
    date: 'April 16, 2020',
    coverImage: 'Galleries/pics/pranitha-subhash/1.jpg',
    category: 'Celebrity Photoshoot'
  }
];

const galleriesData = [];

galleryFiles.forEach((g) => {
  let images = [];
  let description = '';

  if (fs.existsSync(g.filename)) {
    const html = fs.readFileSync(g.filename, 'utf-8');
    const $ = cheerio.load(html);

    description = $('meta[name="description"]').attr('content') || $('.buy-sin p').first().text().trim() || g.title;

    // Collect all images in flexslider or img tags
    $('ul.slides li img, .flexslider img, img').each((_, img) => {
      let src = $(img).attr('src') || '';
      let alt = $(img).attr('alt') || g.title;

      // Clean up relative path prefixes
      src = src.replace(/^\.\.\//, '').replace(/^http:\/\/oakshow\.in\//, '').replace(/^https:\/\/oakshow\.in\//, '');

      if (
        src &&
        !src.includes('favicon') &&
        !src.includes('logo') &&
        !src.includes('rating') &&
        !src.includes('arrow') &&
        !src.includes('header') &&
        !src.includes('footer') &&
        !images.some(existing => existing.src === src)
      ) {
        images.push({
          src,
          alt,
          caption: alt || `${g.title} Image`
        });
      }
    });
  }

  // Fallback check if images array is empty, check folder
  if (images.length === 0 && g.movieSlug) {
    const posterDir = path.join('pics', 'Films', g.movieSlug, 'posters');
    if (fs.existsSync(posterDir)) {
      const files = fs.readdirSync(posterDir);
      files.forEach(f => {
        images.push({
          src: `pics/Films/${g.movieSlug}/posters/${f}`,
          alt: `${g.movieTitle} Poster ${f}`,
          caption: `${g.movieTitle} - ${f}`
        });
      });
    }
  }

  galleriesData.push({
    id: g.filename.replace(/[\/\\]/g, '-').replace('.html', ''),
    filename: g.filename,
    title: g.title,
    movieSlug: g.movieSlug,
    movieTitle: g.movieTitle,
    date: g.date,
    category: g.category,
    coverImage: g.coverImage,
    description,
    imagesCount: images.length,
    images
  });

  console.log(`✓ Parsed "${g.filename}" -> ${images.length} images`);
});

fs.writeFileSync('data/galleries.json', JSON.stringify(galleriesData, null, 2), 'utf-8');
console.log(`\n✓ Saved ${galleriesData.length} galleries to data/galleries.json`);
