import mongoose, { Document, Model } from 'mongoose';
import { userRoles } from '../utils/userRoles';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  token?: string;
}

const isGmail = function(email: string) {
  return /\b[A-Z0-9._%+-]+@gmail\.com\b/i.test(email);
};

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isGmail,
      message: 'Email must be a valid Gmail address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER
  },
  token: {
    type: String,
  }
});

const User: Model<User> = mongoose.model<User>('User', userSchema);

export { User };
