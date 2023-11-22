import { Document, model, Schema } from 'mongoose';

interface Product extends Document {
  title: string;
  description: string;
  price: number;
  stock: number;
  discountPercentage: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const productSchema = new Schema<Product>({
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
  stock: {
    type: Number,
    required: false,
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
}, { timestamps: true });

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;