const express = require('express');
const router  = express.Router();
const Role = require('../models/Role');
const Session = require("../helpers/session");
const User = require ('../models/User')

router.get ('/',Session.verifyToken,(req,res)=>{
  User.aggregate(
    [{$group: {_id:"$rol"}}])
  .then (rolesEnUsuarios=>{
    rolesOcupados=[]   
for (i=0 ; i<rolesEnUsuarios.length ; i++)
{rolesOcupados.push(rolesEnUsuarios[i]._id)
};
Role.find({_id:{$in:rolesOcupados}})
.then(rolesNoBorrables=>{
  let arr = []
  for (i=0; i< rolesNoBorrables.length; i++)
  {arr.push({_id: rolesNoBorrables[i]._id, nom: rolesNoBorrables[i].nom, 
    num: rolesNoBorrables[i].num, 
    borrable: false})};
  Role.find({_id:{$nin:rolesOcupados}})
  .then(rolesNoBorrables=>{
    let arrr = []
    for (i=0; i< rolesNoBorrables.length; i++)
    {arrr.push({_id: rolesNoBorrables[i]._id, nom: rolesNoBorrables[i].nom, 
      num: rolesNoBorrables[i].num, 
      borrable: true})};
    let result = ({arrr, arr});
    let data = [];
    for (i = 0; i<result.arr.length; i ++)
          { data.push(result.arr[i])};
for (i = 0; i<result.arrr.length; i ++)
{data.push(result.arrr[i])};

data.sort(function (a, b) {
  if (a.num > b.num) {
    return 1;
  }
  if (a.num < b.num) {
    return -1;
  }
})

 res.send(data) 
  })
  .catch(err=>{
    res.send({err:err, mssg:'no encontro los roles en los ocupados'})
  })
})
.catch(err=>{
  res.send({err:err, mssg:'no encontro los roles en los ocupados'})
})
  })
.catch(error=>{res.send({mssg:'No se pudiseron agrupar los roles en usuarios',err:error})})  
});

router.post('/create',Session.verifyToken, Session.hasPermission('/roles'),(req,res) =>{
  console.log('Este es el body para crear perfiles: ',req.body);
  let {nom}= req.body;
  Role.findOne({})
  .sort({num:-1})
  .limit(1)
  .then( nam =>{
    let {num} = nam
    let nro = num +1;
  Role.create({nom: nom, num:nro})
  .then(rol=>{
    console.log('Se crearon este rol: num:', nro, 'nom:', nom)
    res.send(rol);
  })
  .catch(erro=>{
    res.send(erro);
  })
})
  .catch(err=>{
    res.send ('no se puede encontrar al rol', err)
  })

});

router.patch('/edit', Session.verifyToken, Session.hasPermission('/roles'), (req,res)=>{

  let {_id, nom} = req.body;
  Role.findByIdAndUpdate({_id: _id}, {$set:{nom: nom}})
  .then (data =>{
    res.send(data);
  })
  .then (err=>{
    console.log('Ocurrio esto al momento de patchear los roles : ', err)
  })
});

router.delete('/remove/:_id', Session.verifyToken, Session.hasPermission('/roles'), (req,res)=>{
  let {_id} = req.params;
  Role.findByIdAndDelete(_id)
  .then(resp=>{
    res.send({msg:'se borro correctamente', res})
  })
  .catch(err=>{
    res.send({msg:'no se pudo eliminar el perfil', err})
  })
})

module.exports = router;