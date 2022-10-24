import db from '../db.json' assert { type: 'json' };

function getAcronym(req, res) {
  const acronymResult = db.find(acronymObj => !!acronymObj[req.params.key])?.[req.params.key];
  if (!acronymResult) {
    return res.status(400).json({ error: 'No such acronym exists in database!' });
  }
  res.json({ value: acronymResult });
}

export default [
  getAcronym
]