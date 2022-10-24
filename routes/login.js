import jwt from 'jsonwebtoken';

const userDB = {
  daniel: ['db.read', 'db.write'],
  bob: ['db.read']
}

function login(req, res) {
  const { username } = req.body;
  if (!userDB[username]) {
    res.send(401);
  }
  const user = {
    name: username,
    scopes: userDB[username]
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
}

export default [
  login
]