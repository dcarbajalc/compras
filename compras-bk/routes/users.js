const express = require('express');
const router  = express.Router();
const Session = require("../helpers/session");
const User = require ('../models/User')

router.get('/',Session.verifyToken, (req,res)=>{
  User.find({})
  .populate('rol')
  .sort({num:1})
  .then ( data=>{res.send(data)}
  )
  .catch( err=>{res.send(err)})
})


module.exports = router;