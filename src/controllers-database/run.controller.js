
import History from "../models/history.model.js";

import Run from "../models/run.model.js";


export const getRuns = async (req, res) => {
  try {
    const runs = await Run.find();
    //const runs = await Run.find().populate("automationId"); nose aca ver como se usa ref "User" en history para hacer algo parecido pero con automation/automationId, pero hay dos modos

    /*

const historySchema = new mongoose.Schema({
  documentId: mongoose.Schema.Types.ObjectId, ESTE
  collectionName: String,
  fieldName: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  updatedAt: Date,
  changedBy: {
    type: mongoose.Types.ObjectId, Y ESTE
    ref: "User", FUNCIONA GRACIAS AL REF
  },
});


    */
   // console.log(tasks);
    res.json(runs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const getRun = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);
    if (!run) return res.status(404).json({ message: "Run not found" });
    return res.json(run);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
  