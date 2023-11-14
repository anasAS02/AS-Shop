import { Document, model, Schema } from 'mongoose';

interface Category extends Document {
  title: string;
  href: string;
  thumbnail: string;
}

const CategorySchema = new Schema<Category>({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const CategoryModel = model<Category>('Category', CategorySchema);

export default CategoryModel;