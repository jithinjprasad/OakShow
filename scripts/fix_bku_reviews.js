import fs from 'fs';
import path from 'path';

const moviesPath = path.resolve('data/movies.json');
const reviewsPath = path.resolve('data/reviews.json');
const newsPath = path.resolve('data/news.json');

// 1. Remove external outsider reviews from reviews.json (reviews.json is only for OakShow in-house certified critics)
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
reviews = reviews.filter(r => !r.id?.startsWith('bku-review') && r.movieId !== 'BethlehemKudumbaUnit');
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');
console.log(`✅ Cleaned data/reviews.json — removed non-inhouse reviews.`);

// 2. Update movie in movies.json so external authorized reviews appear under articles/criticReviewsList
let movies = JSON.parse(fs.readFileSync(moviesPath, 'utf8'));
const mIdx = movies.findIndex(m => m.id === 'BethlehemKudumbaUnit');

if (mIdx !== -1) {
  const m = movies[mIdx];
  
  // Format articles array containing all 6 authorised outsider reviews + 3 news reports
  m.articles = [
    {
      headline: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha lead a sweet, non-creepy age-gap rom-com",
      author: "The Indian Express",
      date: "August 21, 2026",
      section: "Critic Review (4/5)",
      url: "https://indianexpress.com/article/entertainment/movie-review/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-lead-a-sweet-non-creepy-age-gap-rom-com-10842662/"
    },
    {
      headline: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha Baiju's warm rom-com charms",
      author: "India Today",
      date: "August 21, 2026",
      section: "Critic Review (3/5)",
      url: "https://www.indiatoday.in/movies/regional-cinema/story/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-warm-rom-com-2976749-2026-08-21"
    },
    {
      headline: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha Baiju Light Up Girish AD's Breezy Age-Gap Romance",
      author: "NDTV",
      date: "August 21, 2026",
      section: "Critic Review (3.5/5)",
      url: "https://www.ndtv.com/entertainment/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-light-up-girish-ads-breezy-age-gap-romance-3-5-stars-11941111"
    },
    {
      headline: "Bethlehem Kudumba Unit Movie Review: Nivin Pauly and Mamitha Baiju shine in Girish A.D.'s endearing comedy",
      author: "The Hindu",
      date: "August 21, 2026",
      section: "Critic Review",
      url: "https://www.thehindu.com/entertainment/movies/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-girish-ad-age-gap-romance-malayalam-movie/article71373578.ece"
    },
    {
      headline: "Bethlehem Kudumba Unit Review: Nivin Pauly, Mamitha Baiju are note-perfect in a sweet, wondrous gift of a film",
      author: "Hindustan Times",
      date: "August 21, 2026",
      section: "Critic Review (4.5/5)",
      url: "https://www.hindustantimes.com/entertainment/others/bethlehem-kudumba-unit-review-nivin-pauly-mamitha-baiju-are-note-perfect-in-a-sweet-wondrous-gift-of-a-film-101787420407252.html"
    },
    {
      headline: "Bethlehem Kudumba Unit Movie Review: A fresh, lighthearted comedy anchored by stellar chemistry",
      author: "Times of India",
      date: "August 21, 2026",
      section: "Critic Review (3.5/5)",
      url: "https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/bethlehem-kudumba-unit/movie-review/133402475.cms"
    },
    {
      headline: "Suresh Krishna on Bethlehem Kudumba Unit: Working with Nivin Pauly and Girish AD was a joyride",
      author: "Mathrubhumi",
      date: "August 2026",
      section: "Interview",
      url: "https://www.mathrubhumi.com/movies-music/interview/suresh-krishna-bethlehem-kudumba-unit-interview-ve36twjw"
    },
    {
      headline: "Bethlehem Kudumba Unit and the Age-Gap Romance Debate: How Girish AD navigates modern relationships with grace",
      author: "The Week",
      date: "August 29, 2026",
      section: "Feature",
      url: "https://www.theweek.in/news/entertainment/2026/08/29/bethlehem-kudumba-unit-age-gap-debate.html"
    },
    {
      headline: "Bethlehem Kudumba Unit Box Office: Nivin Pauly starrer collects Rs 9.50 crore on Day 8; crosses Rs 60 crore worldwide",
      author: "Pinkvilla",
      date: "August 29, 2026",
      section: "Box Office",
      url: "https://www.pinkvilla.com/entertainment/box-office/bethlehem-kudumba-unit-kerala-box-office-collections-nivin-pauly-starrer-collects-rs-9-50-crore-on-day-8-grosses-rs-60-crore-1405160"
    }
  ];

  movies[mIdx] = m;
  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');
  console.log(`✅ Updated Bethlehem Kudumba Unit with 9 external articles & reviews in data/movies.json`);
}
