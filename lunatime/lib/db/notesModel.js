import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  note: String,
});

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export default noteSchema;
