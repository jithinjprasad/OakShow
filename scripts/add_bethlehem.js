import fs from 'fs';
import path from 'path';

const moviesPath = path.resolve('data/movies.json');
const searchIndexPath = path.resolve('data/search_index.json');
const reviewsPath = path.resolve('data/reviews.json');
const newsPath = path.resolve('data/news.json');

const movieEntry = {
  id: "BethlehemKudumbaUnit",
  slug: "bethlehem-kudumba-unit",
  type: "movie",
  category: "Indian",
  score: 8.5,
  filename: "BethlehemKudumbaUnit.html",
  title: "Bethlehem Kudumba Unit",
  metaTitle: "Bethlehem Kudumba Unit All Ratings, Reviews, Songs, Videos, Bookings and News",
  description: "A breezy, heartwarming romantic comedy following Justin Davis, an audio cassette enthusiast known as 'Mp3 King', and Ashley Thankachan, exploring love, family dynamics, and endearing relationships.",
  plot: "Justin Davis (Nivin Pauly), an energetic audio enthusiast famously dubbed 'Mp3 King' in his local neighborhood, crosses paths with Ashley Thankachan (Mamitha Baiju). Amidst eccentric family units, lively cousins, and hilarious misadventures involving brothers Joel and friends Glixon and Baiju, a tender, unconventional romance blooms that tests familial bonds and modern relationships in the most hilarious and heartwarming fashion.",
  language: "Malayalam",
  releaseDate: "August 21, 2026",
  year: "2026",
  genre: "Romantic Comedy, Drama",
  duration: "2hr 35mins",
  director: "Girish A. D.",
  cast: "Nivin Pauly, Mamitha Baiju, Sangeeth Prathap, Roshan Shanavas, Shyam Mohan, Suresh Krishna, Vinay Forrt, Srinda, Meenakshi Raveendran, Sreerenjini, Bindu Panicker, Shameer Khan, Parvathy Ayyappadas, Vineeth Vishwam, Syam Pushkaran",
  poster: "pics/Films/BethlehemKudumbaUnit/1.jpg",
  gallery: [
    {
      src: "pics/Films/BethlehemKudumbaUnit/2.jpg",
      alt: "Bethlehem Kudumba Unit Official Key Banner"
    },
    {
      src: "pics/Films/BethlehemKudumbaUnit/Bethlehem_Kudumba_Unit.jpg",
      alt: "Nivin Pauly as Justin and Mamitha Baiju as Ashley"
    },
    {
      src: "pics/Films/BethlehemKudumbaUnit/Bethlehem_Kudumba_Unit2.jpg",
      alt: "Bethlehem Kudumba Unit Cinematic Still"
    },
    {
      src: "pics/Films/BethlehemKudumbaUnit/Bethlehem_Kudumba_Unit_Poster.jpg",
      alt: "Official Theatrical Release Poster"
    }
  ],
  ratings: [
    {
      source: "OakShow",
      score: "8.5/10",
      url: "https://oakshow.in/BethlehemKudumbaUnit.html",
      icon: "pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png"
    },
    {
      source: "IMDb",
      score: "8.4/10",
      url: "https://www.imdb.com/title/tt37535100/",
      icon: "pics/RatingSiteLogos/imdb.png"
    },
    {
      source: "Rotten Tomatoes",
      score: "100%",
      url: "https://www.rottentomatoes.com/m/bethlehem_kudumba_unit",
      icon: "pics/RatingSiteLogos/rottentomatoes.png"
    },
    {
      source: "Letterboxd",
      score: "4.0/5",
      url: "https://letterboxd.com/film/bethlehem-kudumba-unit/",
      icon: "pics/RatingSiteLogos/letterboxd.png"
    },
    {
      source: "Hindustan Times",
      score: "4.5/5",
      url: "https://www.hindustantimes.com/entertainment/others/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-are-note-perfect-in-a-sweet-wondrous-gift-of-a-film-101787420407252.html",
      icon: "pics/RatingSiteLogos/hindustantimes.png"
    },
    {
      source: "The Indian Express",
      score: "4.0/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-lead-a-sweet-non-creepy-age-gap-rom-com-10842662/",
      icon: "pics/RatingSiteLogos/indianexpress.png"
    },
    {
      source: "Times of India",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/bethlehem-kudumba-unit/movie-review/133402475.cms",
      icon: "pics/RatingSiteLogos/times-of-india.png"
    },
    {
      source: "NDTV",
      score: "3.5/5",
      url: "https://www.ndtv.com/entertainment/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-light-up-girish-ads-breezy-age-gap-romance-3-5-stars-11941111",
      icon: "pics/RatingSiteLogos/ndtv.png"
    },
    {
      source: "India Today",
      score: "3.0/5",
      url: "https://www.indiatoday.in/movies/regional-cinema/story/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-warm-rom-com-2976749-2026-08-21",
      icon: "pics/RatingSiteLogos/indiatoday.png"
    }
  ],
  bookings: [
    {
      provider: "BookMyShow",
      url: "https://in.bookmyshow.com/movies/mumbai/bethlehem-kudumba-unit/ET00502829",
      label: "Book on BookMyShow"
    },
    {
      provider: "District App",
      url: "https://www.district.in/movies/bethlehem-kudumba-unit-movie-tickets-MV226245?srsltid=AfmBOopqAgzi1JAeN3m685ww_VtMoChaYpFVfGc89bik32WM8q4083Gq",
      label: "Book on District App"
    },
    {
      provider: "Fandango",
      url: "https://www.fandango.com/bethlehem-kudumba-unit-2026-246692/movie-overview",
      label: "Book on Fandango"
    },
    {
      provider: "TicketNew",
      url: "https://ticketnew.com/movies/bethlehem-kudumba-unit-movie-detail-226245",
      label: "Book on TicketNew"
    }
  ],
  musicStreaming: [
    {
      provider: "Spotify",
      url: "https://open.spotify.com/album/5csusQmmo7K6fZmv2GmB0j",
      label: "Stream Album on Spotify"
    },
    {
      provider: "JioSaavn",
      url: "https://www.jiosaavn.com/album/bethlehem-kudumba-unit/IdclyaFWIGI_",
      label: "Stream on JioSaavn"
    },
    {
      provider: "Apple Music",
      url: "https://music.apple.com/in/song/illey-illa-from-bethlehem-kudumba-unit/6805903729",
      label: "Listen on Apple Music"
    }
  ],
  trailers: [
    {
      title: "Song: Illey Illa (Lyric Video)",
      url: "https://www.youtube.com/watch?v=7BQjxSEF4Lg",
      embedUrl: "https://www.youtube-nocookie.com/embed/7BQjxSEF4Lg",
      type: "Song"
    },
    {
      title: "Official Song Teaser",
      url: "https://www.youtube.com/watch?v=gXw39T1cSY0",
      embedUrl: "https://www.youtube-nocookie.com/embed/gXw39T1cSY0",
      type: "Song"
    },
    {
      title: "Official Theatrical Trailer (Malayalam)",
      url: "https://www.youtube.com/watch?v=fk0JHh1P9H0",
      embedUrl: "https://www.youtube-nocookie.com/embed/fk0JHh1P9H0",
      type: "Trailer"
    },
    {
      title: "Theatrical Trailer (Tamil)",
      url: "https://www.youtube.com/watch?v=Fv1FQi6CWe4",
      embedUrl: "https://www.youtube-nocookie.com/embed/Fv1FQi6CWe4",
      type: "Trailer"
    },
    {
      title: "Theatrical Trailer (Telugu)",
      url: "https://www.youtube.com/watch?v=bnJG5OxkB34",
      embedUrl: "https://www.youtube-nocookie.com/embed/bnJG5OxkB34",
      type: "Trailer"
    },
    {
      title: "Soulmates - Oru Saathukkudi Pranayam | Joel Davis | Justin Davis | Malayalam Romantic Short Film",
      url: "https://www.youtube.com/watch?v=DVakMNAyrlg",
      embedUrl: "https://www.youtube-nocookie.com/embed/DVakMNAyrlg",
      type: "Short Film / Promo"
    }
  ],
  videos: [
    {
      title: "Official Theatrical Trailer",
      embedUrl: "https://www.youtube-nocookie.com/embed/fk0JHh1P9H0",
      url: "https://www.youtube.com/watch?v=fk0JHh1P9H0"
    },
    {
      title: "Song: Illey Illa",
      embedUrl: "https://www.youtube-nocookie.com/embed/7BQjxSEF4Lg",
      url: "https://www.youtube.com/watch?v=7BQjxSEF4Lg"
    },
    {
      title: "Soulmates - Oru Saathukkudi Pranayam",
      embedUrl: "https://www.youtube-nocookie.com/embed/DVakMNAyrlg",
      url: "https://www.youtube.com/watch?v=DVakMNAyrlg"
    }
  ],
  criticReviewsList: [
    {
      title: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha lead a sweet, non-creepy age-gap rom-com",
      publication: "The Indian Express",
      date: "August 21, 2026",
      score: "4.0/5",
      url: "https://indianexpress.com/article/entertainment/movie-review/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-lead-a-sweet-non-creepy-age-gap-rom-com-10842662/"
    },
    {
      title: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha Baiju's warm rom-com charms",
      publication: "India Today",
      date: "August 21, 2026",
      score: "3.0/5",
      url: "https://www.indiatoday.in/movies/regional-cinema/story/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-warm-rom-com-2976749-2026-08-21"
    },
    {
      title: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha Baiju Light Up Girish AD's Breezy Age-Gap Romance",
      publication: "NDTV",
      date: "August 21, 2026",
      score: "3.5/5",
      url: "https://www.ndtv.com/entertainment/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-light-up-girish-ads-breezy-age-gap-romance-3-5-stars-11941111"
    },
    {
      title: "Bethlehem Kudumba Unit Movie Review: Nivin Pauly and Mamitha Baiju shine in Girish A.D.'s endearing comedy",
      publication: "The Hindu",
      date: "August 21, 2026",
      score: "Recommended",
      url: "https://www.thehindu.com/entertainment/movies/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-girish-ad-age-gap-romance-malayalam-movie/article71373578.ece"
    },
    {
      title: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha Baiju are note-perfect in a sweet, wondrous gift of a film",
      publication: "Hindustan Times",
      date: "August 21, 2026",
      score: "4.5/5",
      url: "https://www.hindustantimes.com/entertainment/others/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-are-note-perfect-in-a-sweet-wondrous-gift-of-a-film-101787420407252.html"
    },
    {
      title: "Bethlehem Kudumba Unit Movie Review: A fresh, lighthearted comedy anchored by stellar chemistry",
      publication: "Times of India",
      date: "August 21, 2026",
      score: "3.5/5",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/bethlehem-kudumba-unit/movie-review/133402475.cms"
    }
  ],
  newsBulletins: [
    {
      headline: "Suresh Krishna on Bethlehem Kudumba Unit: Working with Nivin Pauly and Girish AD was a joyride",
      publication: "Mathrubhumi",
      date: "August 2026",
      url: "https://www.mathrubhumi.com/movies-music/interview/suresh-krishna-bethlehem-kudumba-unit-interview-ve36twjw"
    },
    {
      headline: "Bethlehem Kudumba Unit and the Age-Gap Romance Debate: How Girish AD navigates modern relationships with grace",
      publication: "The Week",
      date: "August 29, 2026",
      url: "https://www.theweek.in/news/entertainment/2026/08/29/bethlehem-kudumba-unit-age-gap-debate.html"
    },
    {
      headline: "Bethlehem Kudumba Unit Box Office: Nivin Pauly starrer collects Rs 9.50 crore on Day 8; crosses Rs 60 crore worldwide",
      publication: "Pinkvilla",
      date: "August 29, 2026",
      url: "https://www.pinkvilla.com/entertainment/box-office/bethlehem-kudumba-unit-kerala-box-office-collections-nivin-pauly-starrer-collects-rs-9-50-crore-on-day-8-grosses-rs-60-crore-1405160"
    }
  ]
};

// 1. Update movies.json
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const existingIdx = movies.findIndex(m => m.id === movieEntry.id || m.filename === movieEntry.filename);
if (existingIdx !== -1) {
  movies[existingIdx] = movieEntry;
} else {
  movies.unshift(movieEntry);
}
fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`✅ Saved ${movieEntry.title} in data/movies.json (${movies.length} total movies)`);

// 2. Update search_index.json
let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
const searchItem = {
  id: movieEntry.id,
  title: movieEntry.title,
  type: "movie",
  category: "Indian",
  year: movieEntry.year,
  genre: movieEntry.genre,
  language: movieEntry.language,
  score: movieEntry.score,
  poster: movieEntry.poster
};
const sIdx = searchIndex.findIndex(s => s.id === movieEntry.id);
if (sIdx !== -1) {
  searchIndex[sIdx] = searchItem;
} else {
  searchIndex.unshift(searchItem);
}
fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`✅ Saved in search_index.json (${searchIndex.length} indexed items)`);

// 3. Update reviews.json
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
movieEntry.criticReviewsList.forEach((cr, i) => {
  const rObj = {
    id: `bku-review-${i + 1}`,
    movieId: movieEntry.id,
    movie: movieEntry.title,
    author: cr.publication,
    criticName: cr.publication,
    outlet: cr.publication,
    score: cr.score,
    rating: cr.score,
    date: cr.date,
    title: cr.title,
    url: cr.url
  };
  const rFound = reviews.findIndex(r => r.url === cr.url);
  if (rFound !== -1) reviews[rFound] = rObj;
  else reviews.unshift(rObj);
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');
console.log(`✅ Saved critic reviews in data/reviews.json`);

// 4. Update news.json
let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
movieEntry.newsBulletins.forEach((nb, i) => {
  const nObj = {
    id: `bku-news-${i + 1}`,
    movieId: movieEntry.id,
    movieTitle: movieEntry.title,
    title: nb.headline,
    source: nb.publication,
    date: nb.date,
    url: nb.url,
    category: "Indian Cinema"
  };
  const nFound = news.findIndex(n => n.url === nb.url);
  if (nFound !== -1) news[nFound] = nObj;
  else news.unshift(nObj);
});
fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
console.log(`✅ Saved news reports in data/news.json`);
