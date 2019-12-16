const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Cogemos el token guardado en el header
  const token = req.header('x-auth-token');

  // Si no hay ningún token, lanzamos este mensaje y no seguimos
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verificamos el token y guardamos los datos de usuario en "req"
  // Esto lo usamos en toda la aplicación
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
