import Customer from "../models/customer.model.js";
import History from "../models/history.model.js"; // Asegúrate de importar el modelo de Historia

import mongoose from "mongoose";

export const getCustomers = async (req, res) => {
  try {
   //  const customers = await Customer.find(); HARD DELETE 
    const customers = await Customer.find({ isActive: true }); // SOFT DELETE

    /*console.log(' encontre todos los customers?? = ');
    console.log(' ---------------------------------- ');
    console.log(customers);
    console.log(' ---------------------------------- ');*/

    res.json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDeletedCustomers = async (req, res) => {
  try {
   //  const customers = await Customer.find(); HARD DELETE 
    const customers = await Customer.find({ isActive: false }); // SOFT DELETE

    /*console.log(' encontre todos los customers?? = ');
    console.log(' ---------------------------------- ');
    console.log(customers);
    console.log(' ---------------------------------- ');*/

    res.json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    console.log('1852 | CREATE CUSTOMER'+ req.body);
    console.log(req.body);
    const { name, address, hourFee } = req.body; // Ajusta los campos según el esquema de Customer
    const newCustomer = new Customer({
      name,
      address,
      hourFee, // Asegúrate de que este campo exista en tu esquema de Customer
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    let errorMessage = error.message;

    let statusCode;

  
    
    if (error.name === "ValidationError") {

     // console.log('1924 log 2 | ValidationError | entro????');

      let fields = Object.values(error.errors);
      errorMessage = "Invalid data for customer: ";
    
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

export const deleteCustomer = async (req, res) => {
  try {
    //const deletedCustomer = await Customer.findByIdAndDelete(req.params.id); HARD DELETE
    const deletedCustomer = await Customer.updateOne({ _id: req.params.id}, { isActive: false }); // Soft delete
   // Bill.updateOne({ _id: billId }, { isActive: false }).then(...); // Soft delete

    if (!deletedCustomer)
      return res.status(404).json({ message: "Customer not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 1.0 DEPRECATED
export const updateCustomerDEPRECATED = async (req, res) => {
 
  try {
    console.log('1852 | UPDATE CUSTOMER |'+ req.body);
    console.log(req.body);
    const { name, address, hourFee } = req.body; // Ajusta los campos según el esquema de Customer
    const customerUpdated = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      { name, address, hourFee }, // Asegúrate de que estos campos existan en tu esquema de Customer
      { new: true }
    );
    return res.json(customerUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// 1.0 DEPRECATED


// 2.0 UPDATED
export const updateCustomer = async (req, res) => {
  try {
    console.log('1852 | UPDATE CUSTOMER |', req.body);
    
    console.log('2035 | FULL USER | starts', req);
    console.log(req.user);

    const { id } = req.params;
    const updates = req.body;

    console.log("148 º updates");
    console.log(updates);

    // Encuentra el cliente actual antes de actualizar
    const originalCustomer = await Customer.findById(id).lean(); // .lean() ? https://mongoosejs.com/docs/tutorials/lean.html

    console.log("148 º originalCustomer");
    console.log(originalCustomer);


    if (!originalCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Actualizar el cliente
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true });

    console.log("148 º updatedCustomer");
    console.log(updatedCustomer);

    // Crear registros de historia para cada cambio
    Object.keys(updates).forEach(async (field) => {
      if ((String(originalCustomer[field]) !== String(updatedCustomer[field])) && (field !== "updatedAt")) {
        const historyRecord = new History({
          documentId: id,
          collectionName: 'customers',
          fieldName: field,
          oldValue: originalCustomer[field],
          newValue: updatedCustomer[field],
          updatedAt: new Date(),
          changedBy: new mongoose.Types.ObjectId(req.user.id) // Asegúrate de que req.user.id esté disponible
        });
        await historyRecord.save();
      }
    });

    return res.json(updatedCustomer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    return res.json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


