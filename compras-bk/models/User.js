const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    num :{type: Number, required: true, unique:true},
    nom :{type: String, required: true},
    email: { type: String, required: true, unique: true },
    pass:{ type:String, required: true},
    rol: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role"
    },
    active:{required:true, type: Boolean}
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

;

module.exports = mongoose.model("User", userSchema);
