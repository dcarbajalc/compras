const express = require('express');
const router  = express.Router();
const User = require('../models/User')


router.get('/usuarios',(req,res)=>{
  let {num} = req.query;
User.findOne({num:num, active:true},{num:1, nom:1, _id:0})
.then(data=>{
  console.log(data);
  data === null?
  res.send({data: data, msg:'No existe registro del usuario'}):
  res.send({data:data, msg:'Se encontró exitosamente al usuario'})
})
.catch(err=>{
  console.log(err);
  res.send({err:err, msg:'No se pudo conectar para encontrar usuarios'})
})
});

module.exports = router;