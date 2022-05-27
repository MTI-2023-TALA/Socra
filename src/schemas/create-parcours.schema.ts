import mongoose, { Schema } from 'mongoose';

const createParcoursSchema = new Schema({
  titre: String,
  description: String,
});

const Parcours = mongoose.model('Parcours', createParcoursSchema);
