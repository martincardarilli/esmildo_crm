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

const runSchema = new mongoose.Schema({
  timestamp: Date,
  automationName: String,
  description: String,
  tag: String,
  info: [String], // yo quiero poner JSONS
});

const Run = mongoose.model('Run', runSchema);

export default Run;
