const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const MenuRol = require('../models/MenuRol');
const User = require ('../models/User');



router.get('/menusxusr',(req,res)=>{


  let {user} = req.headers;

  let num = user;
 
  User
  .findOne({num:num})
  .then(ru =>{
    let {rol}= ru;
    MenuRol
    .find({rol:rol, active:true})
    .select({ menu: 1,id_menu:1, _id:0})
    .populate({path: 'menu', options: { sort: { 'padre': 1, 'orden':1 } } })
    .then(rr=>{
  let n = rr.length  
  let nuevo =[];
  console.log('esto es rr: ',rr);
  for (i = 0; i<n ; i++)
  {rr[i].menu!== null &&  nuevo.push(rr[i].menu); console.log(i, rr[13])}; // como porqué verga me cambió un ID???
  nuevo.sort(function (a, b) {
  if (a.padre > b.padre) {
    return 1;
  }
  if (a.padre < b.padre) {
    return -1;
  }
else {
 if (a.orden > b.orden) {
    return 1;
  }
 else if (a.orden < b.orden) {
    return -1;
  }
  return 0}
});
res.send(nuevo)
    })
    .catch(err=>{
      res.send({err:err,message:'No pudo buscar ek menu'})
    })
  })
  .catch(err=>{
    res.send({data:err, message:'No Se encontró al usuario correctamente'})
  });
});



module.exports = router;