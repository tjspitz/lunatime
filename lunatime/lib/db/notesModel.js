import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  note: String,
});

const Note = mongoose.model('Note', notesSchema);

export default notesSchema;
