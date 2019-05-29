const mongoose = require("mongoose");
const Menu =require ("../models/Menu");
const Role =require ("../models/Role");
const Parametro = require('../models/Parametro');
const User = require ('../models/User');
const bcrypt = require ('bcrypt');


mongoose
  .connect('mongodb://localhost/compras-bk', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  registerUser = (nom,email, pass) =>{

    const bSalt = 10;
    const salt = bcrypt.genSaltSync(bSalt);
    const password = pass;
    const Epass = bcrypt.hashSync(password,salt);
    
    Parametro.findOne({num:1})
    .then (res=>{
      console.log('Esto Devuelve la búsqueda del rol: ',res);
      console.log('Este es el jodido numero con el que lo voy a buscar en los roles',res.num);
      Role.findOne({num: res.num})
      .then(ress =>{
        console.log('este es el ress:',ress)
        let id_rol = ress._id;
        User.create({num:1, nom:nom, email:email, pass:Epass , rol:id_rol, active:true})
        .then(res=>{console.log('se creo al usuario: ',res);
        })
        .catch(err=>{
          console.log('Este es el error al crear al usuario:', err)
        })

        
      })
     

    })
    .catch(err=>{
      console.log('Error en la busqueda del Parametro:',err)
    })
    };


  registerUser('Domingo Javier Carbajal Cerón','d.carbajalc@gmail.com','1');