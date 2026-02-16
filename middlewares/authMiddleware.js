//para proteger rutas, saber si el usuario está logueado o no
module.exports = function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect("/auth/login");
};
