const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserRol = require('../models/MenuRol')


exports.verifyToken = (req, res, next) => {
  console.log('los headers que deben de traer el token : ', req.headers);
  console.log('el bodyu:', req.body)
  const { token, user } = req.headers;
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error)
      return res.status(401).json({
        error,
        message: "Token no es valido o ha expirado",
      });
    User.findOne({num: decoded.num}).then(user => {
      req.user = user;
      next();
    });
  });
};

exports.hasPermission = checkRoles = ruta => {
  return (req, res, next) => {
  let {user} = req.headers;
 User.findOne({num: user})
 .then(data =>{
   let rol = data.rol;
   UserRol.find({rol: rol, active: true})
  .populate({
    path: 'menu',
    match: { evento: ruta},
    options: { limit: 1 },
    select:'evento -_id'
  })
  .then(datta=>{   
    const nuevo = datta.find(registro => registro.menu !== null );
    if (nuevo !== undefined){return next()}
    else {res.send({ error:{err:'No tienes permisos para ejecutar esto!!!',msg:'No tienes permisos para este acceso'}})}
  })
  .catch(err=>{
    res.send({msg:'No se pudo hacer la busqueda en MenuRol', err:err})
  })
 })
 .catch (
  err=>{
    res.send({msg: 'No se encontró al usuario para validar Ruta', err:err})
  } 
  )
}
};