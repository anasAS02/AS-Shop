import mongoose, { Document, Model } from 'mongoose';
import { userRoles } from '../utils/userRoles';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  country: string;
  address: string;
  phoneNumber: string;
  role: string;
  token?: string;
  verified: boolean;
}

const isGmail = function(email: string) {
  return /\b[A-Z0-9._%+-]+@gmail\.com\b/i.test(email);
};

const isPhoneNumber = function(phoneNumber: string) {
  return /^\+1[0-9]+$/.test(phoneNumber);
}

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
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: isPhoneNumber,
      message: 'i\'s not a valid number'
    }
  },
  country: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER
  },
  token: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const User: Model<User> = mongoose.model<User>('User', userSchema);

export { User };
