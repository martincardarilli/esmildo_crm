import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    nombreApellido: {
      type: String,
    },
    direccion: {
      type: String,
    },
    email: {
      type: Number,

    },
    telefono: {
      type: String,
    },
    dni: {
      type: String,
    },
    cuitCuil: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true 
      // By default, a new Customer is active (soft erase system/recycle bin/recovery logic)
      // src/dbPATCH.js
      // para aquellos objetos que no tenian el campo
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Customer", customerSchema);



