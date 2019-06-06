const express = require('express');
const router  = express.Router();
const Menu = require('../models/Menu');
const Role = require('../models/Role');
const MenuRol = require('../models/MenuRol');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/RegeneraRoles', (req,res)=>{
Role.findOne({num:1})
.then(resul =>{ 
  let Rol = resul._id;
  Menu.aggregate([ 
    {$sort:{num: 1} },
    {$project:{ _id:0, menu: '$_id', 'active':'true', 
    'rol':String(Rol)
  }}])
  .then(data =>{
    MenuRol.collection.drop();
    MenuRol.create(data)
    .then(resultado=>{
      res.send ({data:resultado, message:'El registro se realizó correctamente'})
    })
    .catch(err=>{
      res.sendStatus({err:err, message:'No se pudo realizar ya el insert a la relacion'})
    })
    
    })
  .catch(err=>{
    
    res.send({err:err, message:'Tu consulta no fue exitosa'}) 
    })
  })
  .catch(err=>{
    res.send({message:'No encontramos al rol', err:err})
  })
});




module.exports = router;
