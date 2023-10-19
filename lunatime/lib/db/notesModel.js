import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  note: String,
});

export default noteSchema;
