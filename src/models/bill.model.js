import mongoose from "mongoose";
const { Schema } = mongoose;

// Assuming you have already defined and imported customerSchema
// import Customer from './path_to_your_customer_model';

const billSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Bill", billSchema);
