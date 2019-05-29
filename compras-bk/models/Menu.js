const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    num :{type: Number, required: true, unique:true},
    nom:{type:String},
    padre:{type:Number},
    orden:{type:Number},
    rama:{type:Number},
    ventana:{type:Boolean},
    evento:{type:String}
  }
);

module.exports = mongoose.model("Menu", menuSchema);
