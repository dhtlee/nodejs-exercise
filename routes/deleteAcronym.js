import db from '../db.json' assert { type: 'json' };
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

function deleteAcronym(req, res) {
  const { key } = req.params;
  const acronymIndex = db.findIndex(acronymObj => !!acronymObj[key]);
  db.splice(acronymIndex, 1);
  return res.status(204).end();
}

export default [
  authenticate,
  authorize('db.write'),
  deleteAcronym
]