const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menurolSchema = new Schema(
  {
menu:{
  type: Schema.Types.ObjectId,
  required: true,
  ref: "Menu"
},
rol:{type: Schema.Types.ObjectId,
  required: true,
  ref: "Role"},
active:{type:Boolean}
  }
);

module.exports = mongoose.model("MenuRol", menurolSchema);