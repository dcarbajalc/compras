const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proveedorSchema = new Schema(
  {
    num :{type: Number, required: true, unique:true},
    nom :{type: String, required: true},
    email: {type: String, required:true},
    rfc: {type:String, required:true, unique:true}
  }
);

module.exports = mongoose.model("Proveedor", proveedorSchema);