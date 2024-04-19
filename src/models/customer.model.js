import mongoose from "mongoose";
import validator from 'validator'; 
const customerSchema = new mongoose.Schema(
  {
    nombreApellido: {
      type: String,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true, // Asegúrate de que el correo electrónico sea único en la base de datos
      lowercase: true, // Convierte el email a minúsculas antes de guardarlo
    },
    telefono: {
      type: String,
    },
    dni: {
      type: String,
      unique: true,
    },
    cuitCuil: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true 
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Customer", customerSchema);



