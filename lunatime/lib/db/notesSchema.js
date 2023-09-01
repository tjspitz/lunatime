import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  createdAt: Date,
  lastEdited: Date,
  note: String,
});

const Note = mongoose.model('Note', notesSchema);

export default notesSchema;
