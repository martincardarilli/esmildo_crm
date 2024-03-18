import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema(
  {
    fabricante: {
      type: String,

    },
    modelo: {
      type: String,

    },
    año: {
      type: Number,

    },
    patente: {
      type: String,
    },
    km: {
      type: Number,

    },
    valor: {
      type: Number,

    },
    estado: {
      type: String,

    },
    color: {
      type: String,

    },
    puertas: {
      type: Number,

    },
    traccion: {
      type: String,

    },
    motor: {
      type: String,

    },
    ac: {
      type: String,

    },
    dh: {
      type: String,

    },
    propietario: {
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



