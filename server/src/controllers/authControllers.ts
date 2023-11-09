import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/userModel';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';

const register = asyncWrapper((
    async(req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, country, address, role } = req.body;

        if (!name || !email || !password || !address || !country) {
            const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
            return next(error);
        }


        const user = await User.findOne({ email });
        if (user) {
        const error = new AppError('Choose another Email or Password', 401, httpStatusText.ERROR);
        return next(error);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            country,
            address,
            role
        })

        newUser.token = jwt.sign({role: newUser.role, email: newUser.email}, process.env.JWT_SECRET_KEY || '', {expiresIn: '1h'});
        await newUser.save();
        res.status(201).json({status: httpStatusText.SUCCESS, User: {token: newUser.token, email: newUser.email}})
    }
))

const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
      return next(error);
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        const error = new AppError('Something is wrong', 401, httpStatusText.ERROR);
        return next(error);
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        const error = new AppError('Something is wrong', 401, httpStatusText.ERROR);
        return next(error);
      }

      if (user && matchPassword) {
        const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });
        user.token = token;
        res.status(200).json({ status: httpStatusText.SUCCESS, User: { token, email: user.email, role: user.role } });
      }
    } catch (error) {
      return next(error);
    }
  }
);



export { register, login };
