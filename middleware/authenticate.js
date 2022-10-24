import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authHeader = req.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.send(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.send(403);
    }
    req.user = user;
    return next();
  });
}