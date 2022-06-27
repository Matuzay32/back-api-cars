import { Schema } from 'mongoose';

export const CarSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: {
    type: String,
    // require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});