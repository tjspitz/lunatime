import mongoose from 'mongoose';
import cycleSchema from './cycleModel.js';
import notesSchema from './notesSchema.js';

const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  username: String,
  password: String,
  pic: Buffer,
  cycleLength: { type: Number, default: 30 },
  menstrualLength: { type: Number, default: 5 },
  address: {
    city: String,
    state: String,
    zip: Number,
  },
  dates: [cycleSchema],
  notes: [notesSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
