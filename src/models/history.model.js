/* Para llevar el registro de cada cambio en un objeto */




/*


User object id - Quien lo hizo

Record Id modificado

Field

Valor antes

Valor despues




timestamps


*/

import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  documentId: mongoose.Schema.Types.ObjectId,
  collectionName: String,
  fieldName: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  updatedAt: Date,
  changedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const History = mongoose.model('History', historySchema);

export default History;
