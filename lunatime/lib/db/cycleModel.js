import mongoose from 'mongoose';

const cycleSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  cycleLength: Number,
  menstrualLength: Number,
  fertileRange: [Date, Date],
  pmsRange: [Date, Date],
  menstrualRange: [Date, Date],
});

const Cycle = mongoose.model('Cycle', cycleSchema);

export default cycleSchema;