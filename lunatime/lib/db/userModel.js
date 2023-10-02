import mongoose from 'mongoose';
import cycleSchema from './cycleModel.js';
import notesSchema from './notesModel.js';

const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  username: { type: String, required: false },
  password: { type: String, required: true },
  pic: { type: Buffer, required: false },
  cycleLength: { type: Number, default: 30 },
  menstrualLength: { type: Number, default: 5 },
  address: {
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: Number, required: false },
  },
  dates: [cycleSchema],
  notes: [notesSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
