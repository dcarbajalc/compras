const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parametroSchema = new Schema(
  {
    num :{type: Number, required: true, unique:true},
    descri:{type: String, required: true},
    value:{type: String}
  }
);

module.exports = mongoose.model("Parametro", parametroSchema);

