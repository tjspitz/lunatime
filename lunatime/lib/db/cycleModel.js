import mongoose from 'mongoose';

const cycleSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  cycleLength: Number,
  periodLength: Number,
  pmsRange: [Date, Date],
  fertileRange: [Date, Date],
  menstrualRange: [Date, Date],
});

const Cycle = mongoose.models.Cycle || mongoose.model('Cycle', cycleSchema);

export default cycleSchema;
