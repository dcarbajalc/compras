const express = require('express');
const router  = express.Router();
const bcrypt = require ('bcrypt');
const User = require ('../models/User');
const Role =require ("../models/Role");
const Parametro = require('../models/Parametro');

/* GET home page */
router.post('/', (req, res) => {
  console.log('este es el body', req.body)
  let {nombre, email, pass}= req.body;
  const bSalt = 10;
  const salt = bcrypt.genSaltSync(bSalt);
  const password = pass;
  const Epass = bcrypt.hashSync(password,salt);

  User.findOne({})
  .sort({ num: -1 })
  .limit(1)
  .then(result=>{
    let nro = result.num+1;
  Parametro.findOne({num:1})
  .then(ress=>{
      let numrol = ress.value;
      Role.findOne({num:numrol})
      .then(ressss=>{
          let idroll = ressss._id;
          User.create({num:nro,nom:nombre,email:email,pass:Epass,rol:idroll,active:1})
          .then(respuestafinal=>{
            res.send({res:respuestafinal,message:'Te registraste correctamente, eres un crack!!!'})
          })
          .catch(errorfinal=>{
            res.send({err:errorfinal,message:'No se puede crear este usuario!!! el mail ya existe'})
          })
      })
      .catch( errrr=>{
        res.send({err:errrr, message:'ni existe el rol que tienes parametrizado'})
      })
  })
  .catch( errr=>{
    res.send({err:errr, message:'No hay parámetros'})
  })
  })
  .catch(err=>{
    res.send({err:err, message:'ni siquiera se puede buscar al usuario'})
  })


});

module.exports = router;
