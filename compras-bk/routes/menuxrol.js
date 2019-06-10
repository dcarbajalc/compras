const express = require('express');
const router  = express.Router();
const Role = require('../models/Role');
const Session = require("../helpers/session");
const Menurol = require ('../models/MenuRol');
const Menu = require ('../models/Menu')

router.get ('/',Session.verifyToken,(req,res)=>{
let {perfil}= req.headers;
Menurol.find({rol:perfil})
.populate('menu')
.populate('rol')
.then(relacion=>{
  if(relacion.length > 1)
  {res.send(relacion)}
  else 
    {
    Role.find({_id:perfil})
    .then (rol =>{
      Menu.find({})
      .then (menus=>{
        let arr = {menus,rol}
        let a = arr.menus;
        let b = arr.rol;
        let c =[];
        for(i=0; i< a.length; i++)
      {c.push ({ 
      menu: a[i],
      rol: b[0],
      active: false
      })};
        res.send(c)
      })
      .catch (err=>{
        res.send({msg:'No se pudieron encontrar todos los menus disponibles', err})
      })
    })
    .catch(err=>{
      res.send({msg:'No se pudieron encontrar los roles',err})
    })
    }
})
.catch (err=>{
  res.send({msg:'No se pudo encontrar el menurol',err})
})
});

router.post('/edit',Session.verifyToken,Session.hasPermission('/menurol'), (req,res)=>{
  let {perfil} = req.headers;
  let data = req.body
  console.log('Esto ya llego la pedicion',req.body)
  Menurol.deleteMany({rol:perfil})
  .then(datat=>{
    console.log('Esto se borró:', datat)

    Menurol.create(data)
    .then(datos=>{
      console.log('se agregaron correctamente... ', datos.length, ' elemntos, eres el mejor')
    })
    .catch(err=>{
      res.send({msg:'no se inserto la data ya al momento de ponerlo', err})
    })
  })
.catch(err=>{
res.send({msg:'no se puede borrar las relaciones actuales', err:err})
})

})


module.exports = router;