const express = require('express');
const router  = express.Router();
const Session = require("../helpers/session");
const User = require ('../models/User');
const bcrypt = require ('bcrypt');

router.post('/mipass', Session.verifyToken, (req,res)=>{

  let{user} = req.headers;
  let {pass} = req.body;
  const bSalt = 10;
  const salt = bcrypt.genSaltSync(bSalt);
  const password = pass;
  const Epass = bcrypt.hashSync(password,salt);
  User.findOneAndUpdate({num:user},  
    { $set: { pass : Epass}})
.then (data=>{
  console.log('el body que llega a la peticion: ', req.body)
  console.log(`Se trata de actualizar con datos ${user} con ${pass} y el body ${req.body}`,req.body,data);
res.send ({msg:'el password se actualizó correctamente', data:data})
})
.catch(err=>{
  res.send({msg:'No se pudo cambiar el Password', err:err})
})
});

router.post('/otropass', Session.verifyToken, Session.hasPermission('/passus'), (req,res)=>{
  let {user, pass} = req.body;
  const bSalt = 10;
  const salt = bcrypt.genSaltSync(bSalt);
  const password = pass;
  const Epass = bcrypt.hashSync(password,salt);
  User.findOneAndUpdate({num:user},  
    { $set: { pass : Epass}})
.then (data=>{
  console.log(`Se trata de actualizar con datos ${user} con ${pass}`,data);
res.send ({msg:'el password se actualizó correctamente', data:data})
})
.catch(err=>{
  res.send({msg:'No se pudo cambiar el Password', err:err})
})
});

module.exports = router;