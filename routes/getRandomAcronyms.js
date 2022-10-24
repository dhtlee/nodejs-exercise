import db from '../db.json' assert { type: 'json' };
import { getRandomInt } from '../utils';

export function getRandomAcronyms(req, res) {
  const count = Number(req.params.count);
  const picked = [];
  const blackList = new Set();
  for (let i = 0; i < count; i++) {
    let foundUnique = false;
    let pickedIndex;
    while (!foundUnique) {
      pickedIndex = getRandomInt(db.length);
      if (blackList.has(pickedIndex)) {
        console.log('pickedIndex in blacklist, generate a new index...', { pickedIndex, blackList });
        continue;
      }
      foundUnique = true;
    }
    blackList.add(Math.max(pickedIndex - 1, 0))
    blackList.add(pickedIndex)
    blackList.add(Math.min(pickedIndex + 1, db.length));

    console.log('pickedIndex chosen, getting next random acronym...', { pickedIndex, blackList });
    picked.push(db[pickedIndex]);
  }
  res.json(picked);
}

export default [
  getRandomAcronyms
]