import mongoose from 'mongoose';
// import Cycle from './cycleModel';
import cycleSchema from './cycleModel.js';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  pic: Buffer,
  address: {
    city: String,
    state: String,
    zip: Number,
  },
  dates: [cycleSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
