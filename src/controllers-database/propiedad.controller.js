import Propiedad from '../models/propiedad.model.js';
import History from '../models/history.model.js'; // Asegúrate de importar el modelo de Historia

import mongoose from 'mongoose';

export const getPropiedades = async (req, res) => {
  try {
    //  const propiedades = await Propiedad.find(); HARD DELETE
    // const propiedades = await Propiedad.find({ isActive: true }); // SOFT DELETE
    // const propiedades = await Propiedad.find({ isActive: true }).populate('propietario', 'nombreApellido'); // SOFT DELETE
    const propiedades = await Propiedad.find({ isActive: true }).populate('propietario'); // SOFT DELETE

    /*console.log(' encontre todos los propiedades?? = ');
    console.log(' ---------------------------------- ');
    console.log(propiedades);
    console.log(' ---------------------------------- ');*/

    res.json(propiedades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDeletedPropiedades = async (req, res) => {
  try {
    //  const propiedades = await Propiedad.find(); HARD DELETE
    const propiedades = await Propiedad.find({ isActive: false }); // SOFT DELETE

    /*console.log(' encontre todos los propiedades?? = ');
    console.log(' ---------------------------------- ');
    console.log(propiedades);
    console.log(' ---------------------------------- ');*/

    res.json(propiedades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPropiedad = async (req, res) => {
  try {
    console.log('--------starts--------------- req.body --------------------');
    console.log(req.body);
    console.log('--------starts--------------- req.body --------------------');

    const { propiedad, tipo, superficie, valor, estado, propietario } = req.body; // Ajusta los campos según el esquema de Propiedad

    console.log('propietario???');
    console.log(propietario);

    const newPropiedad = new Propiedad({ propiedad, tipo, superficie, valor, estado, propietario: new mongoose.Types.ObjectId(propietario) });
    await newPropiedad.save();
    res.status(201).json(newPropiedad);
  } catch (error) {
    let errorMessage = error.message;
    let statusCode;

    if (error.name === 'ValidationError') {
      // console.log('1924 log 2 | ValidationError | entro????');

      let fields = Object.values(error.errors);
      errorMessage = 'Invalid data for Propiedad: ';

      fields.forEach((err, index) => {
        // Añadir el campo a la cadena de mensaje
        errorMessage += `${err.path}`;

        // Añadir una coma si no es el último elemento, o la palabra 'and' si es el penúltimo
        if (index < fields.length - 2) {
          errorMessage += ', ';
        } else if (index === fields.length - 2) {
          errorMessage += ' and ';
        }
      });

      // Agregar 'is' o 'are' dependiendo del número de campos
      errorMessage += fields.length > 1 ? ' are' : ' is a';
      errorMessage += ' required field';
      errorMessage += fields.length > 1 ? 's.' : '.';

      statusCode = 400; // Cambiar a Bad Request para errores de validación
    }

    // log AWS -
    // MENSAJE INTERNO SERVER AWS
    console.log('QUE NO???????????');
    console.log(error);

    return res.status(statusCode).json({ message: errorMessage });
    //return res.status(500).json({ message: error.message });
  }
};

export const deletePropiedad = async (req, res) => {
  try {
    //const deletedPropiedad = await Propiedad.findByIdAndDelete(req.params.id); HARD DELETE
    const deletedPropiedad = await Propiedad.updateOne({ _id: req.params.id }, { isActive: false }); // Soft delete
    // Bill.updateOne({ _id: billId }, { isActive: false }).then(...); // Soft delete

    if (!deletedPropiedad) return res.status(404).json({ message: 'Propiedad not found' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 1.0 DEPRECATED
export const updatePropiedadDEPRECATED = async (req, res) => {
  try {
    console.log('1852 | UPDATE Propiedad |' + req.body);
    console.log(req.body);
    const { propiedad, tipo, superficie, valor, estado, propietario } = req.body; // Ajusta los campos según el esquema de Propiedad
    const propiedadUpdated = await Propiedad.findOneAndUpdate(
      { _id: req.params.id },
      { propiedad, tipo, superficie, valor, estado, propietario }, // Asegúrate de que estos campos existan en tu esquema de Propiedad
      { new: true }
    );
    return res.json(propiedadUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// 1.0 DEPRECATED

// 2.0 UPDATED
export const updatePropiedad = async (req, res) => {
  try {
    console.log('1852 | UPDATE Propiedad |', req.body);

    // console.log('2035 | FULL USER | starts', req);
    console.log(req.user);

    const { id } = req.params;
    const updates = req.body;

    console.log('148 º updates');
    console.log(updates);

    // Encuentra el cliente actual antes de actualizar
    const originalPropiedad = await Propiedad.findById(id).lean(); // .lean() ? https://mongoosejs.com/docs/tutorials/lean.html

    console.log('148 º originalPropiedad');
    console.log(originalPropiedad);

    if (!originalPropiedad) {
      return res.status(404).json({ message: 'Propiedad not found' });
    }

    // Actualizar el cliente
    const updatedPropiedad = await Propiedad.findByIdAndUpdate(id, updates, { new: true }).populate('propietario');

    console.log('148 º updatedPropiedad');
    console.log(updatedPropiedad);

    // Crear registros de historia para cada cambio
    Object.keys(updates).forEach(async (field) => {
      if (String(originalPropiedad[field]) !== String(updatedPropiedad[field]) && field !== 'updatedAt') {
        const historyRecord = new History({
          documentId: id,
          collectionName: 'Propiedades',
          fieldName: field,
          oldValue: originalPropiedad[field],
          newValue: updatedPropiedad[field],
          updatedAt: new Date(),
          changedBy: new mongoose.Types.ObjectId(req.user.id), // Asegúrate de que req.user.id esté disponible
        });
        await historyRecord.save();
      }
    });

    return res.json(updatedPropiedad);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPropiedad = async (req, res) => {
  try {
    const propiedad = await Propiedad.findById(req.params.id).populate('propietario');
    if (!propiedad) return res.status(404).json({ message: 'Propiedad not found' });
    return res.json(propiedad);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
