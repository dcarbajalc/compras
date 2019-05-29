const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const detailSchema = new Schema (
  {
    pda:{type: Number, unique:true},
    item:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Item"
    },
    cantidad: {type: Number},
    precio:{type: Number},
    importe: {type: Number}    
  }
);

const ocSchema = new Schema(
  {
    num: {type: Number, required: true, unique:true},
    comprador : {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    proveedor : {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Proveedor"
    },
    st:{type: String},
    detalle:[detailSchema],
    subtotal: {type: Number},
    iva: {type: Number},
    tasa:{type: Number},
    total: {type: Number}
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
module.exports = mongoose.model("Parametro", ocSchema);

