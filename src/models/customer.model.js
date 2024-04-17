import mongoose from "mongoose";
import validator from 'validator'; 
const customerSchema = new mongoose.Schema(
  {
    nombreApellido: {
      type: String,
      required: [true, 'El nombre y apellido son requeridos'],
      trim: true,
  
    },
    direccion: {
      type: String,
      required: [true, 'La dirección es requerida'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      validate: [validator.isEmail, 'Por favor, ingresa una dirección de email válida'],
      unique: true, // Asegúrate de que el correo electrónico sea único en la base de datos
      lowercase: true, // Convierte el email a minúsculas antes de guardarlo
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es requerido']
    },

    dni: {
      type: String,
      required: [true, 'El DNI es requerido'],
      unique: true,
    },
    cuitCuil: {
      type: String,
      unique: true,
      required: [true, 'El CUIT/CUIL es requerido'],
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



