/**
 * OakShow Smart Recommendations Utility
 * 
 * Resolves similar movies and shows:
 * - Prioritizes explicitly configured similar titles (from HTML/JSON data)
 * - If less than 5 similar titles exist:
 *     * Adds titles from the same universe (Marvel for Marvel, DC for DC, Dragon Ball for Dragon Ball, Star Wars, etc.)
 *     * Adds titles from the same genre (Animation for animation, Sci-Fi for sci-fi, Drama for drama, etc.)
 * - Arranges the final similar list based on ratings (highest rated first)
 */

export function parseScorePercentage(scoreStr) {
  if (!scoreStr) return 0;
  const str = String(scoreStr).trim();
  if (str.includes('%')) return Math.min(100, Math.max(0, parseFloat(str) || 0));
  if (str.includes('/10')) {
    const num = parseFloat(str.split('/')[0]) || 0;
    return Math.min(100, Math.max(0, (num / 10) * 100));
  }
  if (str.includes('/5')) {
    const num = parseFloat(str.split('/')[0]) || 0;
    return Math.min(100, Math.max(0, (num / 5) * 100));
  }
  if (str.includes('/100')) {
    const num = parseFloat(str.split('/')[0]) || 0;
    return Math.min(100, Math.max(0, num));
  }
  const n = parseFloat(str);
  if (!isNaN(n)) {
    if (n <= 5) return (n / 5) * 100;
    if (n <= 10) return (n / 10) * 100;
    return Math.min(100, n);
  }
  return 0;
}

export function getItemRatingScore(item) {
  if (!item) return 0;
  if (item.ratings && Array.isArray(item.ratings) && item.ratings.length > 0) {
    const oak = item.ratings.find(r => r.source && /oakshow/i.test(r.source));
    if (oak && oak.score) return parseScorePercentage(oak.score);
    const imdb = item.ratings.find(r => r.source && /imdb/i.test(r.source));
    if (imdb && imdb.score) return parseScorePercentage(imdb.score);
    for (const r of item.ratings) {
      if (r.score) return parseScorePercentage(r.score);
    }
  }
  if (item.score) return parseScorePercentage(String(item.score));
  if (item.rating) return parseScorePercentage(String(item.rating));
  return 0;
}

export function detectUniverse(item) {
  if (!item) return null;
  const text = `${item.id || ''} ${item.title || ''} ${item.genre || ''} ${item.plot || ''} ${item.description || ''} ${item.universe || ''}`.toLowerCase();

  // Dragon Ball
  if (/(dragon\s*ball|dragonball|goku|vegeta|broly|saiyan|dbs\b)/i.test(text)) {
    return 'dragonball';
  }

  // Marvel
  if (/(marvel|mcu|avengers|iron man|spider-?man|thor\b|captain america|black panther|doctor strange|ant-man|guardians of the galaxy|deadpool|wolverine|x-men|hulk\b|thanos|eternals|shang-chi|black widow|loki\b|falcon and the winter soldier|wandavision|blade\b)/i.test(text)) {
    return 'marvel';
  }

  // DC
  if (/(dceu|dc comics|batman|dark knight|superman|justice league|wonder woman|flash\b|joker\b|aquaman|shazam|harley quinn|suicide squad|green lantern|lanterns|peacemaker|supergirl|robin\b|batgirl)/i.test(text)) {
    return 'dc';
  }

  // Star Wars
  if (/(star\s*wars|jedi|sith|skywalker|mandalorian|darth\b)/i.test(text)) {
    return 'starwars';
  }

  return null;
}

export function getCleanTitleKey(t) {
  return (t || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

/**
 * Resolves similar movies or shows with universe/genre padding (<5) and rating-based sorting.
 */
export function getSimilarRecommendations(target, pool = [], fallbackPool = [], minCount = 5, maxCount = 8) {
  if (!target) return [];

  const targetId = (target.id || '').toLowerCase();
  const targetTitleKey = getCleanTitleKey(target.title);
  const seenIds = new Set([targetId]);
  const seenTitles = new Set([targetTitleKey]);
  const result = [];

  function addCandidate(c) {
    if (!c) return false;
    const cId = (c.id || '').toLowerCase();
    const cTitleKey = getCleanTitleKey(c.title);
    if (seenIds.has(cId) || (cTitleKey && seenTitles.has(cTitleKey))) return false;
    seenIds.add(cId);
    if (cTitleKey) seenTitles.add(cTitleKey);
    result.push(c);
    return true;
  }

  // 1. Prioritize explicitly mentioned similar movies/shows
  if (target.similar && Array.isArray(target.similar) && target.similar.length > 0) {
    const combinedPool = [...pool, ...fallbackPool];
    for (const sim of target.similar) {
      const linkClean = (sim.link || '').replace(/^\/+/, '').replace(/\.html$/i, '').toLowerCase();
      const titleClean = getCleanTitleKey(sim.title);

      const match = combinedPool.find(m => {
        const mId = (m.id || '').toLowerCase();
        const mFile = (m.filename || m.fileName || '').replace(/^\/+/, '').replace(/\.html$/i, '').toLowerCase();
        const mTitleKey = getCleanTitleKey(m.title);
        return (linkClean && (mId === linkClean || mFile === linkClean)) || (titleClean && mTitleKey === titleClean);
      });

      if (match) {
        addCandidate(match);
      } else {
        const fallbackId = (sim.link || sim.title || '').replace(/\.html$/i, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        addCandidate({
          id: fallbackId,
          title: sim.title,
          filename: sim.link || `${fallbackId}.html`,
          poster: sim.poster || '/favicon.png',
          ratings: sim.ratings || [],
          rating: sim.rating || null,
          year: '',
          language: ''
        });
      }
    }
  }

  // 2. If less than minCount (5), pad with same universe or same genre
  if (result.length < minCount) {
    const universe = detectUniverse(target);
    const targetGenres = (target.genre || '').toLowerCase().split(',').map(g => g.trim()).filter(Boolean);
    const isAnimation = targetGenres.some(g => /anim/i.test(g)) || /anim/i.test(target.title || '');
    const isSciFi = targetGenres.some(g => /sci-?fi|science fiction/i.test(g));
    const isDrama = targetGenres.some(g => /drama/i.test(g));
    const targetLang = (target.language || '').toLowerCase();

    // Candidates filtered from primary pool first, then fallback pool
    const getFilteredCandidates = (candPool) => candPool.filter(c => {
      const cId = (c.id || '').toLowerCase();
      const cTitleKey = getCleanTitleKey(c.title);
      return !seenIds.has(cId) && cId !== targetId && (!cTitleKey || !seenTitles.has(cTitleKey));
    });

    const candidates = [...getFilteredCandidates(pool), ...getFilteredCandidates(fallbackPool)];

    // Universe matches (Marvel for marvel, DC for dc, Dragon Ball for dragon ball, Star Wars, etc.)
    if (universe) {
      const univMatches = candidates
        .filter(c => detectUniverse(c) === universe)
        .sort((a, b) => getItemRatingScore(b) - getItemRatingScore(a));

      for (const m of univMatches) {
        if (result.length >= maxCount) break;
        addCandidate(m);
      }
    }

    // Animation matches (other animation movies/shows for animation movies/shows)
    if (result.length < minCount && isAnimation) {
      const animMatches = candidates
        .filter(c => {
          const g = (c.genre || '').toLowerCase();
          const t = (c.title || '').toLowerCase();
          return /anim/i.test(g) || /anim/i.test(t);
        })
        .sort((a, b) => getItemRatingScore(b) - getItemRatingScore(a));

      for (const m of animMatches) {
        if (result.length >= maxCount) break;
        addCandidate(m);
      }
    }

    // Sci-Fi matches
    if (result.length < minCount && isSciFi) {
      const scifiMatches = candidates
        .filter(c => /sci-?fi|science fiction/i.test(c.genre || ''))
        .sort((a, b) => {
          const aLang = (a.language || '').toLowerCase() === targetLang ? 1 : 0;
          const bLang = (b.language || '').toLowerCase() === targetLang ? 1 : 0;
          if (bLang !== aLang) return bLang - aLang;
          return getItemRatingScore(b) - getItemRatingScore(a);
        });

      for (const m of scifiMatches) {
        if (result.length >= maxCount) break;
        addCandidate(m);
      }
    }

    // Drama matches
    if (result.length < minCount && isDrama) {
      const dramaMatches = candidates
        .filter(c => /drama/i.test(c.genre || ''))
        .sort((a, b) => {
          const aLang = (a.language || '').toLowerCase() === targetLang ? 1 : 0;
          const bLang = (b.language || '').toLowerCase() === targetLang ? 1 : 0;
          if (bLang !== aLang) return bLang - aLang;
          return getItemRatingScore(b) - getItemRatingScore(a);
        });

      for (const m of dramaMatches) {
        if (result.length >= maxCount) break;
        addCandidate(m);
      }
    }

    // Other genre matches (e.g. Comedy, Romance, Action, Thriller, Sports, etc.)
    if (result.length < minCount && targetGenres.length > 0) {
      for (const g of targetGenres) {
        if (result.length >= minCount) break;
        const matches = candidates
          .filter(c => (c.genre || '').toLowerCase().includes(g))
          .sort((a, b) => {
            const aLang = (a.language || '').toLowerCase() === targetLang ? 1 : 0;
            const bLang = (b.language || '').toLowerCase() === targetLang ? 1 : 0;
            if (bLang !== aLang) return bLang - aLang;
            return getItemRatingScore(b) - getItemRatingScore(a);
          });

        for (const m of matches) {
          if (result.length >= maxCount) break;
          addCandidate(m);
        }
      }
    }
  }

  // 3. User requirement: Arrange the shows or movies based on their ratings (descending)
  result.sort((a, b) => getItemRatingScore(b) - getItemRatingScore(a));

  return result.slice(0, maxCount);
}
