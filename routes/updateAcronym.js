import db from '../db.json' assert { type: 'json' };
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

function updateAcronym(req, res) {
  const { key } = req.params;
  const { value } = req.body;
  const acronymIndex = db.findIndex(acronymObj => !!acronymObj[key]);
  if (acronymIndex === -1) {
    return res.status(400).json({ error: 'No such acronym exists in database!' });
  }
  db[acronymIndex] = { [key]: value };
  return res.json(db[acronymIndex]);
}

export default [
  authenticate,
  authorize('db.write'),
  updateAcronym
]