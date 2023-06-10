import { Schema, model, models } from 'mongoose';
import Cycle from './cycleModel';

const userSchema = new Schema({
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
  dates: [Cycle],
});

const User = models.User || model('User', userSchema);

export default User;
