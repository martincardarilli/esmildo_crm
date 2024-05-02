import mongoose from "mongoose";

const propiedadSchema = new mongoose.Schema(
  {
    propiedad: {
      type: String,
    },
    tipo: {
      type: String,
    },
    superficieType: {
      type: String,
    },
    superficieValue: {
      type: Number,
    },
    valorType: {
      type: String,
    },
    valorValue: {
      type: Number,
    },
    estado: {
      type: String,
    },
    dueño: {
      type: String,
    },
    propietario:{
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    tag: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true 
      // By default, a new Propiedad is active (soft erase system/recycle bin/recovery logic)
      // src/dbPATCH.js
      // para aquellos objetos que no tenian el campo
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Propiedad", propiedadSchema);



