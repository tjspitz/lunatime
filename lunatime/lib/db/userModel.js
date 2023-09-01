import mongoose from 'mongoose';
import cycleSchema from './cycleModel.js';
import notesSchema from './notesSchema.js';

const userSchema = new mongoose.Schema({
  createdAt: Date,
  lastEdited: Date,
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  username: String,
  password: String,
  pic: Buffer,
  cycleLength: Number,
  menstrualLength: Number,
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
