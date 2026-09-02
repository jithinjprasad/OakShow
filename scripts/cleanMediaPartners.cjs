const fs = require('fs');

const BOOKING_MAP = {
  'bookmyshow': { provider: 'BookMyShow', icon: 'pics/BookngWebSiteLogos/book-my-show.png' },
  'book my show': { provider: 'BookMyShow', icon: 'pics/BookngWebSiteLogos/book-my-show.png' },
  'paytm': { provider: 'Paytm', icon: 'pics/BookngWebSiteLogos/paytm.png' },
  'fandango': { provider: 'Fandango', icon: 'pics/BookngWebSiteLogos/fandango.png' },
  'ticketnew': { provider: 'TicketNew', icon: 'pics/BookngWebSiteLogos/ticket-new.png' },
  'ticket new': { provider: 'TicketNew', icon: 'pics/BookngWebSiteLogos/ticket-new.png' },
  'cineworld': { provider: 'Cineworld', icon: 'pics/BookngWebSiteLogos/cineworld.png' },
  'odeon': { provider: 'ODEON', icon: 'pics/BookngWebSiteLogos/odeon.png' },
  'eventbrite': { provider: 'Eventbrite', icon: 'pics/BookngWebSiteLogos/eventbrite.png' },
  'movietickets': { provider: 'MovieTickets', icon: 'pics/BookngWebSiteLogos/movie-tickets.png' }
};

const WATCH_MAP = {
  'netflix': { provider: 'Netflix', icon: 'pics/WatchOnline/netflix.png' },
  'amazon prime': { provider: 'Amazon Prime Video', icon: 'pics/WatchOnline/amazon-prime.png' },
  'prime video': { provider: 'Amazon Prime Video', icon: 'pics/WatchOnline/amazon-prime.png' },
  'amazon': { provider: 'Amazon Prime Video', icon: 'pics/WatchOnline/amazon-prime.png' },
  'hotstar': { provider: 'Disney+ Hotstar', icon: 'pics/WatchOnline/hotstar.png' },
  'disney': { provider: 'Disney+ Hotstar', icon: 'pics/WatchOnline/hotstar.png' },
  'apple': { provider: 'Apple TV', icon: 'pics/WatchOnline/apple.png' },
  'itunes': { provider: 'Apple TV / iTunes', icon: 'pics/WatchOnline/apple.png' },
  'hbo': { provider: 'HBO Max', icon: 'pics/WatchOnline/hbo-max.png' },
  'max': { provider: 'HBO Max', icon: 'pics/WatchOnline/hbo-max.png' },
  'hulu': { provider: 'Hulu', icon: 'pics/WatchOnline/hulu.png' },
  'youtube': { provider: 'YouTube Movies', icon: 'pics/WatchOnline/youtube.png' },
  'zee5': { provider: 'ZEE5', icon: 'pics/WatchOnline/zee5.png' },
  'sonyliv': { provider: 'SonyLIV', icon: 'pics/WatchOnline/sony-liv.png' },
  'sony liv': { provider: 'SonyLIV', icon: 'pics/WatchOnline/sony-liv.png' },
  'aha': { provider: 'Aha', icon: 'pics/WatchOnline/aha.png' },
  'sun nxt': { provider: 'Sun NXT', icon: 'pics/WatchOnline/sun-nxt.png' },
  'sunnxt': { provider: 'Sun NXT', icon: 'pics/WatchOnline/sun-nxt.png' },
  'voot': { provider: 'Voot', icon: 'pics/WatchOnline/voot.png' },
  'jiocinema': { provider: 'JioCinema', icon: 'pics/WatchOnline/voot.png' },
  'jio cinema': { provider: 'JioCinema', icon: 'pics/WatchOnline/voot.png' },
  'mx player': { provider: 'MX Player', icon: 'pics/WatchOnline/mx-player.png' },
  'mxplayer': { provider: 'MX Player', icon: 'pics/WatchOnline/mx-player.png' },
  'airtel': { provider: 'Airtel Xstream', icon: 'pics/WatchOnline/airtel-xstream.png' },
  'altbalaji': { provider: 'ALTBalaji', icon: 'pics/WatchOnline/alt-balaji.png' },
  'alt balaji': { provider: 'ALTBalaji', icon: 'pics/WatchOnline/alt-balaji.png' },
  'eros now': { provider: 'Eros Now', icon: 'pics/WatchOnline/eros-now.png' },
  'erosnow': { provider: 'Eros Now', icon: 'pics/WatchOnline/eros-now.png' },
  'google play': { provider: 'Google Play Movies', icon: 'pics/WatchOnline/google-play.png' },
  'adult swim': { provider: 'Adult Swim', icon: 'pics/WatchOnline/adult-swim.png' },
  'cw tv': { provider: 'The CW', icon: 'pics/WatchOnline/cw-tv.png' },
  'the cw': { provider: 'The CW', icon: 'pics/WatchOnline/cw-tv.png' },
  'ullu': { provider: 'ULLU Originals', icon: 'pics/WatchOnline/ullu.png' },
  'kooku': { provider: 'Kooku', icon: 'pics/WatchOnline/kooku.png' },
  'crunchyroll': { provider: 'Crunchyroll', icon: 'pics/WatchOnline/adult-swim.png' }
};

function cleanBookings(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(b => {
    const raw = (b.provider || '').toLowerCase();
    for (const [k, v] of Object.entries(BOOKING_MAP)) {
      if (raw.includes(k)) {
        return {
          ...b,
          provider: v.provider,
          icon: v.icon,
          label: b.label || `Book on ${v.provider}`
        };
      }
    }
    return b;
  });
}

function cleanWatchOnline(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(w => {
    const raw = (w.provider || '').toLowerCase();
    for (const [k, v] of Object.entries(WATCH_MAP)) {
      if (raw.includes(k)) {
        return {
          ...w,
          provider: v.provider,
          icon: v.icon,
          label: w.label || `Watch on ${v.provider}`
        };
      }
    }
    return w;
  });
}

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf8'));
let movieBookingChanges = 0;
let movieWatchChanges = 0;

movies.forEach(m => {
  if (m.bookings && m.bookings.length > 0) {
    m.bookings = cleanBookings(m.bookings);
    movieBookingChanges++;
  }
  if (m.watchOnline && m.watchOnline.length > 0) {
    m.watchOnline = cleanWatchOnline(m.watchOnline);
    movieWatchChanges++;
  }
});

fs.writeFileSync('./data/movies.json', JSON.stringify(movies, null, 2), 'utf8');
console.log(`Cleaned movies: ${movieBookingChanges} booking sets, ${movieWatchChanges} watchOnline sets.`);

const series = JSON.parse(fs.readFileSync('./data/series.json', 'utf8'));
let seriesChanges = 0;

series.forEach(s => {
  if (s.bookings && s.bookings.length > 0) {
    s.bookings = cleanBookings(s.bookings);
  }
  if (s.watchOnline && s.watchOnline.length > 0) {
    s.watchOnline = cleanWatchOnline(s.watchOnline);
  }
  if (Array.isArray(s.seasons)) {
    s.seasons.forEach(season => {
      if (season.watchOnline && season.watchOnline.length > 0) {
        season.watchOnline = cleanWatchOnline(season.watchOnline);
      }
    });
  }
  seriesChanges++;
});

fs.writeFileSync('./data/series.json', JSON.stringify(series, null, 2), 'utf8');
console.log(`Cleaned series: ${seriesChanges} series sets.`);
