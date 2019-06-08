const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (req, res, next) => {

  const { token, user } = req.headers;
 
  console.log(token,user);

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error)
      return res.status(401).json({
        error,
        message: "Token no es valido o ha expirado",
      });
      console.log('esto es el decoded',decoded);
    User.findOne({num: decoded.num}).then(user => {
      console.log('Este es el user que si pasó',user)
      req.user = user;
      next();
    });
  });
};

exports.hasPermission = checkRoles = roles => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    } else {
      res.status(403).json({
        error: {},
        message: "No tienes los permisos necesarios",
      });
    }
  };
};