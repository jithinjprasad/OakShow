import fs from 'fs';
import path from 'path';

const moviesPath = path.resolve('data/movies.json');
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));

const mIdx = movies.findIndex(m => m.id === 'BethlehemKudumbaUnit');
if (mIdx !== -1) {
  const m = movies[mIdx];
  
  const allVids = [
    {
      title: "Song: Illey Illa (Lyric Video)",
      youtubeId: "7BQjxSEF4Lg",
      url: "https://www.youtube.com/watch?v=7BQjxSEF4Lg",
      embedUrl: "https://www.youtube-nocookie.com/embed/7BQjxSEF4Lg",
      type: "Song"
    },
    {
      title: "Official Song Teaser",
      youtubeId: "gXw39T1cSY0",
      url: "https://www.youtube.com/watch?v=gXw39T1cSY0",
      embedUrl: "https://www.youtube-nocookie.com/embed/gXw39T1cSY0",
      type: "Song"
    },
    {
      title: "Official Theatrical Trailer (Malayalam)",
      youtubeId: "fk0JHh1P9H0",
      url: "https://www.youtube.com/watch?v=fk0JHh1P9H0",
      embedUrl: "https://www.youtube-nocookie.com/embed/fk0JHh1P9H0",
      type: "Trailer"
    },
    {
      title: "Theatrical Trailer (Tamil)",
      youtubeId: "Fv1FQi6CWe4",
      url: "https://www.youtube.com/watch?v=Fv1FQi6CWe4",
      embedUrl: "https://www.youtube-nocookie.com/embed/Fv1FQi6CWe4",
      type: "Trailer"
    },
    {
      title: "Theatrical Trailer (Telugu)",
      youtubeId: "bnJG5OxkB34",
      url: "https://www.youtube.com/watch?v=bnJG5OxkB34",
      embedUrl: "https://www.youtube-nocookie.com/embed/bnJG5OxkB34",
      type: "Trailer"
    },
    {
      title: "Soulmates - Oru Saathukkudi Pranayam | Joel Davis | Justin Davis | Malayalam Romantic Short Film",
      youtubeId: "DVakMNAyrlg",
      url: "https://www.youtube.com/watch?v=DVakMNAyrlg",
      embedUrl: "https://www.youtube-nocookie.com/embed/DVakMNAyrlg",
      type: "Short Film / Promo"
    }
  ];

  m.videos = allVids;
  m.trailers = allVids;

  movies[mIdx] = m;
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`✅ Updated Bethlehem Kudumba Unit videos with explicit youtubeIds.`);
}
