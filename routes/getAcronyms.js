import Fuse from 'fuse.js';

import db from '../db.json' assert { type: 'json' };

const options = {
  includeScore: true
};
let acronymKeys = db.map(acronymObj => Object.entries(acronymObj)[0][0]);
const fuse = new Fuse(acronymKeys, options);

function getAcronyms(req, res) {
  const { from: fromQuery = 0, limit: limitQuery = 10, search } = req.query;
  const from = Number(fromQuery);
  const limit = Number(limitQuery);
  if (!search) {
    return res.status(400).json({ error: 'Search query is empty!' });
  }
  const fuzzySearchResults = fuse.search(search)
    .filter(res => res.score < 0.5);
  const fuzzySearchResultsCount = fuzzySearchResults.length;

  const hasPreviousIndex = from > 0;
  if (hasPreviousIndex) {
    res.append('prevIndex', from - 1);
  }
  const hasMoreResults = from + limit < fuzzySearchResultsCount;
  if (hasMoreResults) {
    res.append('nextIndex', from + limit);
  }

  const apiResults = fuzzySearchResults.slice(from, from + limit)
  return res.json(apiResults.map(({ refIndex }) => db[refIndex]));
}

export default [
  getAcronyms
]