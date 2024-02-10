import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

import Customer from './models/customer.model.js'; // Ensure the correct path

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected");

     // Update Customers
     const updateResult = await Customer.updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: true } }
    );

    console.log('Customers updated:', updateResult);
  } catch (error) {
    console.error(error);
  }
};
