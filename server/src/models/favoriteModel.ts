import { Document, model, Schema } from 'mongoose';

interface Favorite extends Document {
  email: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
}

const FavoriteSchema = new Schema<Favorite>({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
});

const FavoriteModel = model<Favorite>('Favorite', FavoriteSchema);

export default FavoriteModel;