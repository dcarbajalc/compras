const mongoose = require("mongoose");
const Menu =require ("../models/Menu");
const Role =require ("../models/Role");
const Parametro = require('../models/Parametro');
const User = require ('../models/User');
const bcrypt = require ('bcrypt');



mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  Menu.collection.drop();
  Parametro.collection.drop();
  Role.collection.drop();
  User.collection.drop();


  const Menus =[
    {num:1 ,nom:'Administración' ,padre: 0 ,orden: 1,rama: 1,ventana: false, evento:'#'},
    {num:2 ,nom:'Seguridad' ,padre: 1 ,orden: 1,rama: 2,ventana: false, evento:'#'},
    {num:3 ,nom:'Datos Usuarios' ,padre: 2 ,orden: 1,rama: 3,ventana: true, evento:'/usuarios'},
    {num:4 ,nom:'Password Usuarios' ,padre: 2 ,orden: 2,rama: 3,ventana: true, evento:'/passus'},
    {num:5 ,nom:'Mi Password' ,padre: 2 ,orden: 3,rama: 3,ventana: true, evento:'/mipass'},
    {num:6 ,nom:'Roles' ,padre: 2 ,orden: 4,rama: 3,ventana: true, evento:'/roles'},
    {num:7 ,nom:'Menu x Rol' ,padre: 2 ,orden: 5,rama: 3,ventana: true, evento:'/menurol'},
    {num:8 ,nom:'ABC Items' ,padre: 1 ,orden: 2,rama: 2,ventana: true, evento:'/items'},
    {num:9 ,nom:'ABC Poveedores' ,padre: 1 ,orden: 3,rama: 2,ventana: true, evento:'/prov'},
    {num:10 ,nom:'Parámetros' ,padre: 1 ,orden: 4,rama: 2,ventana: true, evento:'/params'},
    {num:11 ,nom:'Procesos' ,padre: 0 ,orden: 2,rama: 1,ventana: false, evento:'#'},
    {num:12 ,nom:'Captura OC' ,padre: 11 ,orden: 1,rama: 2,ventana: true, evento:'/oc'},
    {num:13 ,nom:'Autoriza OC' ,padre: 11 ,orden: 2,rama: 2,ventana: true, evento:'/aut'},
    {num:14 ,nom:'Envía OC' ,padre: 11 ,orden: 3,rama: 2,ventana: true, evento:'/send'},
    {num:15 ,nom:'Consultas' ,padre: 0 ,orden: 3,rama: 1,ventana: false, evento:'#'},
    {num:16 ,nom:'Ordenes de compra' ,padre: 15 ,orden: 1,rama: 2,ventana: true, evento:'/ocs'}
  ];




  Menu.create(Menus)
  .then(menus =>{
      console.log(`se crearon ${menus.length}  registros`);
     
  })
  .catch(err =>{
      console.log('Este es el primer error O_o',err);
  });



Role.create({num: 1, nom: 'Administrador'})
  .then(roles =>{
    console.log('Se creo el Rol :', roles);
    Parametro.create(
      {num: 1,descri:'El Id del Rol que tomará por Default al crear Usuarios...', value:'1'})
.then (rol =>{
  console.log('Se creo el parametro:',rol);
});
  })
  .catch(err =>{
    console.log(err);
  });








// Termina el registro del usuario


//console.log('fin del proceso')
// mongoose.connection.close();
