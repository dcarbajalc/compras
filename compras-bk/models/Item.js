const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    num :{type: Number, required: true, unique:true},
    descri:{type: String, required: true},
    unidad:{type: String}
  }
);

module.exports = mongoose.model("Item", itemSchema);

