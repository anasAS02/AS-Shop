import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  userName: string;
  password: string;
  token?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { User };
