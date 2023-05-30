import { Schema, model, models } from 'mongoose';

const cycleSchema = new Schema({
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

const Cycle = models.Cycle || model('Cycle', cycleSchema);

export default Cycle;
