import Vehiculo from "../models/vehiculo.model.js";
import History from "../models/history.model.js"; // Asegúrate de importar el modelo de Historia

import mongoose from "mongoose";

export const getVehiculos = async (req, res) => {
  try {
   //  const vehiculos = await Vehiculo.find(); HARD DELETE 
   const vehiculos = await Vehiculo.find({ isActive: true }).populate('propietario');


    /*console.log(' encontre todos los vehiculos?? = ');
    console.log(' ---------------------------------- ');
    console.log(vehiculos);
    console.log(' ---------------------------------- ');*/

    res.json(vehiculos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDeletedVehiculos = async (req, res) => {
  try {
   //  const vehiculos = await Vehiculo.find(); HARD DELETE 
    const vehiculos = await Vehiculo.find({ isActive: false }); // SOFT DELETE

    /*console.log(' encontre todos los vehiculos?? = ');
    console.log(' ---------------------------------- ');
    console.log(vehiculos);
    console.log(' ---------------------------------- ');*/

    res.json(vehiculos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createVehiculo = async (req, res) => {
  try {
    console.log('1852 | CREATE Vehiculo'+ req.body);
    console.log(req.body);
    const { fabricante, modelo, año, patente, km, valor, estado, color, puertas, traccion, motor, ac, dh, propietario } = req.body; // Ajusta los campos según el esquema de Vehiculo
    const newVehiculo = new Vehiculo({
      fabricante,
      modelo,
      año,
      patente,
      km,
      valor,
      estado,
      color,
      puertas,
      traccion,
      motor,
      ac,
      dh,
      propietario: new mongoose.Types.ObjectId(propietario),
     // Asegúrate de que este campo exista en tu esquema de Vehiculo
    });
    await newVehiculo.save();
    res.status(201).json(newVehiculo);
  } catch (error) {
    let errorMessage = error.message;

    let statusCode;

  
    
    if (error.name === "ValidationError") {

     // console.log('1924 log 2 | ValidationError | entro????');

      let fields = Object.values(error.errors);
      errorMessage = "Invalid data for Vehiculo: ";
    
      fields.forEach((err, index) => {
        // Añadir el campo a la cadena de mensaje
        errorMessage += `${err.path}`;
    
        // Añadir una coma si no es el último elemento, o la palabra 'and' si es el penúltimo
        if (index < fields.length - 2) {
          errorMessage += ", ";
        } else if (index === fields.length - 2) {
          errorMessage += " and ";
        }
      });
    
      // Agregar 'is' o 'are' dependiendo del número de campos
      errorMessage += fields.length > 1 ? " are" : " is a";
      errorMessage += " required field";
      errorMessage += fields.length > 1 ? "s." : ".";

          statusCode = 400; // Cambiar a Bad Request para errores de validación
    }

// log AWS - 
// MENSAJE INTERNO SERVER AWS
    console.log("QUE NO???????????"); 
    console.log(error);



    return res.status(statusCode).json({ message: errorMessage });
    //return res.status(500).json({ message: error.message });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    //const deletedVehiculo = await Vehiculo.findByIdAndDelete(req.params.id); HARD DELETE
    const deletedVehiculo = await Vehiculo.updateOne({ _id: req.params.id}, { isActive: false }); // Soft delete
   // Bill.updateOne({ _id: billId }, { isActive: false }).then(...); // Soft delete

    if (!deletedVehiculo)
      return res.status(404).json({ message: "Vehiculo not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 1.0 DEPRECATED
export const updateVehiculoDEPRECATED = async (req, res) => {
 
  try {
    console.log('1852 | UPDATE Vehiculo |'+ req.body);
    console.log(req.body);
    const { fabricante, modelo, año, patente, km, valor, estado, color, puertas, traccion, motor, ac, dh, propietario } = req.body; // Ajusta los campos según el esquema de Vehiculo
    const vehiculoUpdated = await Vehiculo.findOneAndUpdate(
      { _id: req.params.id },
      { fabricante, modelo, año, patente, km, valor, estado, color, puertas, traccion, motor, ac, dh, propietario }, // Asegúrate de que estos campos existan en tu esquema de Vehiculo
      { new: true }
    );
    return res.json(vehiculoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// 1.0 DEPRECATED


// 2.0 UPDATED
export const updateVehiculo = async (req, res) => {
  try {
    console.log('1852 | UPDATE Vehiculo |', req.body);
    
    console.log('2035 | FULL USER | starts', req);
    console.log(req.user);

    const { id } = req.params;
    const updates = req.body;

    console.log("148 º updates");
    console.log(updates);

    // Encuentra el cliente actual antes de actualizar
    const originalVehiculo = await Vehiculo.findById(id).lean(); // .lean() ? https://mongoosejs.com/docs/tutorials/lean.html

    console.log("148 º originalVehiculo");
    console.log(originalVehiculo);


    if (!originalVehiculo) {
      return res.status(404).json({ message: "Vehiculo not found" });
    }

    // Actualizar el cliente
    const updatedVehiculo = await Vehiculo.findByIdAndUpdate(id, updates, { new: true });

    console.log("148 º updatedVehiculo");
    console.log(updatedVehiculo);

    // Crear registros de historia para cada cambio
    Object.keys(updates).forEach(async (field) => {
      if ((String(originalVehiculo[field]) !== String(updatedVehiculo[field])) && (field !== "updatedAt")) {
        const historyRecord = new History({
          documentId: id,
          collectionName: 'Vehiculos',
          fieldName: field,
          oldValue: originalVehiculo[field],
          newValue: updatedVehiculo[field],
          updatedAt: new Date(),
          changedBy: new mongoose.Types.ObjectId(req.user.id) // Asegúrate de que req.user.id esté disponible
        });
        await historyRecord.save();
      }
    });

    return res.json(updatedVehiculo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo)
      return res.status(404).json({ message: "Vehiculo not found" });
    return res.json(vehiculo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


