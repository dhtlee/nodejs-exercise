export function authorize(scope) {
  return function(req, res, next) {
    if (!req.user.scopes.includes(scope)) {
      return res.send(403);
    }
    return next();
  }
}