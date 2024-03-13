import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    hourFee: {
      type: Number,
      required: true
    },
    tag: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true 
      // By default, a new Vehiculo is active (soft erase system/recycle bin/recovery logic)
      // src/dbPATCH.js
      // para aquellos objetos que no tenian el campo
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vehiculo", vehiculoSchema);



