// everyting starts with a schema
import mongoose from 'mongoose';

const { Schema } = mongoose;

// object constructor with new
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  specialPopulation: { type: String, required: true },
  notes: String,
  status: {
    type: String,
    required: true,
    enum: ['referred', 'evaluation', 'placed'],
    default: 'referred',
  },
  caseManager: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
});

// adding a compound index
studentSchema.index({ user: 1, email: 1 }, { unique: true });

export const Student = mongoose.model('student', studentSchema);
