const fs = require('fs');

const brolyMovie = {
  id: 'DragonBallSuperBroly',
  slug: 'dragonballsuperbroly',
  type: 'movie',
  category: 'Hollywood',
  score: 9.8,
  filename: 'DragonBallSuperBroly.html',
  title: 'Dragon Ball Super: Broly',
  metaTitle: 'Dragon Ball Super: Broly All Ratings, Reviews, Songs, Videos, Bookings and News',
  description: 'Earth is peaceful following the Tournament of Power. Realizing that the universes still hold many more strong people yet to see, Goku spends all his days training to reach even greater heights. Then one day, Goku and Vegeta are faced by a Saiyan called Broly whom they have never seen before.',
  plot: 'Forty-one years ago on Planet Vegeta, King Cold transfers command of his empire to his young son Frieza. King Vegeta discovers that a low-class infant named Broly possesses a latent power level exceeding Prince Vegeta, and exiles Broly to the harsh, uninhabited planet Vampa. In the present day, Frieza scouts Cheelai and Lemo find an adult Broly and his father Paragus on Vampa. Frieza recruits Broly to fight Goku and Vegeta on Earth in an epic clash for the Dragon Balls.',
  language: 'Japanese, English',
  releaseDate: 'Jan 16, 2019',
  year: '2018',
  genre: 'Anime, Action, Sci-Fi',
  duration: '1hr 40mins',
  director: 'Tatsuya Nagamine',
  basedOn: 'Dragon Ball by Akira Toriyama',
  poster: 'pics/Films/DragonBallSuperBroly/1.jpg',
  gallery: [
    { src: 'pics/Films/DragonBallSuperBroly/2.jpg', alt: 'Dragon Ball Super: Broly Key Art' },
    { src: 'pics/Films/DragonBallSuperBroly/Dragon-Ball-Super-Broly-Goku-Vegeta-and-Broly.jpg', alt: 'Goku, Vegeta and Broly' },
    { src: 'pics/Films/DragonBallSuperBroly/Dragon-Ball-Super-Broly-Reviews-and-Ratings.jpg', alt: 'Dragon Ball Super Broly Reviews and Ratings' },
    { src: 'pics/Films/DragonBallSuperBroly/Dragon-Ball-Super-Broly-Goku.jpg', alt: 'Goku Super Saiyan Blue' },
    { src: 'pics/Films/DragonBallSuperBroly/Dragon-Ball-Super-Broly-Vegeta.jpg', alt: 'Vegeta Super Saiyan God' },
    { src: 'pics/Films/DragonBallSuperBroly/Dragon-Ball-Super-Broly-Piccolo.jpg', alt: 'Piccolo' },
    { src: 'pics/Films/DragonBallSuperBroly/posters/dragon-ball-super-broly-official-poster.jpg', alt: 'Official Theatrical Poster' },
    { src: 'pics/Films/DragonBallSuperBroly/posters/dragon-ball-super-broly-broly-poster.jpg', alt: 'Broly Legendary Super Saiyan Poster' },
    { src: 'pics/Films/DragonBallSuperBroly/posters/dragon-ball-super-broly-goku-poster.jpg', alt: 'Goku Theatrical Poster' },
    { src: 'pics/Films/DragonBallSuperBroly/posters/dragon-ball-super-broly-vegeta-poster.jpg', alt: 'Vegeta Theatrical Poster' },
    { src: 'pics/Films/DragonBallSuperBroly/posters/dragon-ball-super-broly-frieza-poster.jpg', alt: 'Golden Frieza Poster' }
  ],
  videos: [
    { title: 'Official English Dub Trailer', url: 'https://www.youtube.com/watch?v=FHgm89hKpXU', type: 'Trailer' },
    { title: 'Final Official Comic-Con Trailer', url: 'https://www.youtube.com/watch?v=FNauY_2_XN4', type: 'Trailer' },
    { title: 'Goku vs Broly - Epic Fight Promo', url: 'https://www.youtube.com/watch?v=8V-wN05bT98', type: 'Teaser' }
  ],
  ratings: [
    { source: 'OakShow', score: '9.8/10', url: '', icon: 'pics/RatingSiteLogos/OakShowCertificates/oakshow-says-it-is-a-must-watch.png' },
    { source: 'IMDb', score: '7.7/10', url: 'https://www.imdb.com/title/tt7961060/', icon: 'pics/RatingSiteLogos/imdb.png' },
    { source: 'Rotten Tomatoes', score: '82%', url: 'https://www.rottentomatoes.com/m/dragon_ball_super_broly', icon: 'pics/RatingSiteLogos/rotten-tomatoes-fresh.png' },
    { source: 'Metacritic', score: '59/100', url: 'https://www.metacritic.com/movie/dragon-ball-super-broly', icon: 'pics/RatingSiteLogos/metacritic.png' },
    { source: 'IGN', score: '8.5/10', url: 'https://in.ign.com/dragon-ball-super-broly/130760/review/dragon-ball-super-broly-review', icon: 'pics/RatingSiteLogos/ign.png' },
    { source: 'Common Sense Media', score: '4/5', url: 'https://www.commonsensemedia.org/movie-reviews/dragon-ball-super-broly', icon: 'pics/RatingSiteLogos/common-sense-media.png' },
    { source: 'The Guardian', score: '3/5', url: 'https://www.theguardian.com/film/2019/jan/23/dragon-ball-super-broly-review-anime', icon: 'pics/RatingSiteLogos/guardian.ico' }
  ],
  cast: [
    { actor: 'Masako Nozawa / Sean Schemmel', role: 'Son Goku' },
    { actor: 'Ryo Horikawa / Christopher Sabat', role: 'Vegeta / Piccolo' },
    { actor: 'Bin Shimada / Vic Mignogna', role: 'Broly' },
    { actor: 'Ryusei Nakao / Christopher Ayres', role: 'Frieza' },
    { actor: 'Katsuhisa Hoki / Dameon Clarke', role: 'Paragus' },
    { actor: 'Nana Mizuki / Monica Rial', role: 'Cheelai' },
    { actor: 'Tomokazu Sugita / Bruce Carey', role: 'Lemo' }
  ],
  music: [
    { title: 'Blizzard', artist: 'Daichi Miura', url: 'https://open.spotify.com/track/4jV1f2sBw7bO2T8WqG2k0D', provider: 'Spotify' },
    { title: 'Dragon Ball Super: Broly Original Soundtrack', artist: 'Norihito Sumitomo', url: 'https://music.apple.com', provider: 'Apple Music' }
  ],
  watchOnline: [
    { provider: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GRDV0019R/dragon-ball-super', icon: 'pics/MediaPartnerLogos/crunchyroll.png', lang: 'Japanese, English Dub' },
    { provider: 'Amazon Prime Video', url: 'https://www.amazon.com/Dragon-Ball-Super-Broly-Original/dp/B07N89FF54', icon: 'pics/MediaPartnerLogos/amazon-prime.png', lang: 'English, Japanese' },
    { provider: 'Apple TV', url: 'https://tv.apple.com/us/movie/dragon-ball-super-broly/umc.cmc.69a68p8c8s82f5k9v5p9j5', icon: 'pics/MediaPartnerLogos/apple-tv.png', lang: 'HD / 4K' }
  ],
  bookings: [
    { provider: 'BookMyShow', url: 'https://in.bookmyshow.com', label: 'Check Theatres & Tickets' },
    { provider: 'Fandango', url: 'https://www.fandango.com', label: 'Book US Tickets' }
  ],
  articles: [
    { headline: "'Dragon Ball Super: Broly' Confirms New Theatrical Run", publisher: 'ComicBook', date: '2019', url: 'https://comicbook.com' },
    { headline: "'Dragon Ball Super: Broly' Has Now Made Over $100 Million Worldwide", publisher: 'Anime News Network', date: '2019', url: 'https://www.animenewsnetwork.com' }
  ]
};

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf8'));
const exists = movies.some(m => m.id === 'DragonBallSuperBroly');
if (!exists) {
  movies.unshift(brolyMovie);
  fs.writeFileSync('./data/movies.json', JSON.stringify(movies, null, 2), 'utf8');
  console.log('Successfully inserted Dragon Ball Super: Broly into data/movies.json');
} else {
  console.log('Dragon Ball Super: Broly already exists in data/movies.json');
}

const searchIndex = JSON.parse(fs.readFileSync('./data/search_index.json', 'utf8'));
const searchExists = searchIndex.some(s => s.id === 'DragonBallSuperBroly');
if (!searchExists) {
  searchIndex.unshift({
    id: 'DragonBallSuperBroly',
    title: 'Dragon Ball Super: Broly',
    type: 'movie',
    category: 'Hollywood',
    year: '2018',
    genre: 'Anime, Action, Sci-Fi',
    rating: '9.8',
    poster: 'pics/Films/DragonBallSuperBroly/1.jpg',
    url: 'DragonBallSuperBroly.html'
  });
  fs.writeFileSync('./data/search_index.json', JSON.stringify(searchIndex, null, 2), 'utf8');
  console.log('Successfully inserted Dragon Ball Super: Broly into data/search_index.json');
}
