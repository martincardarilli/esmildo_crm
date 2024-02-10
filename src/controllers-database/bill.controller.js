import Customer from "../models/customer.model.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

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
    const { name, address, hourFee } = req.body; // Ajusta los campos según el esquema de Customer
    const newCustomer = new Customer({
      name,
      address,
      hourFee, // Asegúrate de que este campo exista en tu esquema de Customer
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    let errorMessage = "Error al crear el cliente";

    let statusCode;
    
    if (error.name === "ValidationError") {
      errorMessage =
        "Datos de cliente inválidos: " +
        Object.values(error.errors)
          .map((err) => `${err.path}: ${err.message}`)
          .join(", ");

          statusCode = 400; // Cambiar a Bad Request para errores de validación
    }


    console.log("QUE NO???????????");
    console.log(error);



    return res.status(statusCode).json({ message: errorMessage });
    //return res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer)
      return res.status(404).json({ message: "Customer not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
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
