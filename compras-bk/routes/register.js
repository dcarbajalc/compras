const express = require('express');
const router  = express.Router();
const bcrypt = require ('bcrypt');
const User = require ('../models/User');
const Role =require ("../models/Role");
const Parametro = require('../models/Parametro');

/* GET home page */
router.post('/', (req, res) => {
  
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
            res.send({err:errorfinal,message:'Ocurrio un error para registrarte :(, dile a TI que tu correo ya existe...'})
          })
      })
      .catch( errrr=>{
        res.send({err:errrr, message:'Ocurrio un error al buscar este nro de rol... dile a TI que ni existe el rol que tiene definido'})
      })
  })
  .catch( errr=>{
    res.send({err:errr, message:'Ocurrió un error al Buscar al parámetro... mejor dile a TI que no ha parametrizado'})
  })
  })
  .catch(err=>{
    res.send({err:err, message:'Ocurrio un lugar al buscar usuarios!!!.... dile a TI que no ha empezado'})
  })


});

module.exports = router;
