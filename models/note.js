import { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  Note: {
    type: String,
    required: [true, 'Note is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Note = models.Note || model('Note', NoteSchema);

export default Note;