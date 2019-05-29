const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    num :{type: Number, required: true, unique:true},
    nom :{type: String, required: true}
  }
);



module.exports = mongoose.model("Role", roleSchema);