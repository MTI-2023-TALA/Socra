import mongoose, { Schema } from 'mongoose';

export const createParcoursSchema = new Schema({
  title: String,
  campus: String,
  durationInMonths: Number,
  type: String,
  price: Number,
  onSitePercentage: Number,
  beginDate: Date,
  modules: {
    title: String,
    description: String,
  },
  createdAt: { type: Date, default: Date.now() },
  description: String,
});

export const Parcours = mongoose.model('Parcours', createParcoursSchema);
