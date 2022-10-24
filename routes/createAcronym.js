import db from '../db.json' assert { type: 'json' };
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

function createAcronym(req, res) {
  const { key, value } = req.body;
  const isAcronymExistInDB = !!db.find(acronymObj => !!acronymObj[key]);
  if (isAcronymExistInDB) {
    return res.status(400).json({ error: 'Acronym already exists in database!' });
  }
  db.push({ [key]: value });
  return res.json(db[db.length - 1]);
}

export default [
  authenticate,
  authorize('db.write'),
  createAcronym
]