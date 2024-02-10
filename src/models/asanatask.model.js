import mongoose from "mongoose";

const AsanaTaskSchema = new mongoose.Schema(
  {
    gid: { /* asana id */
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer'
    },
    description: {
      type: String,
    },
    actual_hours: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AsanaTask", AsanaTaskSchema);
