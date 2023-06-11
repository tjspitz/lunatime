import mongoose from 'mongoose';

const cycleSchema = new mongoose.Schema({
  _id: Date,
  cycle: {
    fStart: Date,
    fEnd: Date,
    pStart: Date,
    pEnd: Date,
    mStart: Date,
    mEnd: Date,
  },
});

const Cycle = mongoose.model('Cycle', cycleSchema);

export default cycleSchema;
