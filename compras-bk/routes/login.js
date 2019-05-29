const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require ('../models/User')

router.post('/mail',(req,res)=>{
  const {email,pass}= req.body;
  User.findOne({email:email, active:true})
  .then(data=>{
    console.log('esta es la data: ',data)
  let {num}=data;
  if (!num) return res.status(404).json({
    err: {},
    message: "Email incorrecto"
  });
  const passwordIsValid = bcrypt.compareSync(pass, data.pass);
  if(!passwordIsValid) return res.status(401).json({
    error: {},
    message: "Contraseña incorrecta"
  });
 jwt.sign({ num: data.num }, 
 process.env.SECRET, 
 {expiresIn: 86400}, function(err, token) {
res.status(200);
res.send({token:token,user:{id: data._id, num:data.num, email:data.email, nom:data.nom}})
})})
.catch(err =>{ console.log('Esto sale en el CATCH: ',err);
return res.status(401).json({
    error: {},
    message: "El usuario no existe"
    })
})
});
////////////////
router.post('/num',(req,res)=>{
  const {num,pass}= req.body;
  User.findOne({num:num, active:true})
  .then(data=>{
    console.log('esta es la data: ',data)
  let {num}=data;
  if (!num) return res.status(404).json({
    err: {},
    message: "Email incorrecto"
  });
  const passwordIsValid = bcrypt.compareSync(pass, data.pass);
  if(!passwordIsValid) return res.status(401).json({
    error: {},
    message: "Contraseña incorrecta"
  });
 jwt.sign({ num: data.num }, 
 process.env.SECRET, 
 {expiresIn: 86400}, function(err, token) {
res.status(200);
res.send({token:token,user:{id: data._id, num:data.num, email:data.email, nom:data.nom}})
})})
.catch(err =>{ console.log('Esto sale en el CATCH: ',err);
return res.status(401).json({
    error: {},
    message: "El usuario no existe"
    })
})
});

module.exports = router;