import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';
import { userRoles } from '../utils/userRoles';

const getUsers = asyncWrapper((
    async (req: Request, res: Response) => {
        const managers = await User.find({role: userRoles.MANAGER});
        const admins = await User.find({role: userRoles.ADMIN});
        const users = await User.find({role: userRoles.USER});
        res.status(200).json({status: httpStatusText.SUCCESS, data:{managers, admins, users}});
    }
))

const addUser = asyncWrapper((
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, country, address, phoneNumber, role, verified } = req.body;
        
        if (!name || !email || !password || !country || !email || !address || !phoneNumber || !role) {
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
            phoneNumber,
            role,
            verified
        })

        newUser.token = jwt.sign({role: newUser.role, email: newUser.email}, process.env.JWT_SECRET_KEY || '', {expiresIn: '1d'});
        await newUser.save();
        res.status(201).json({status: httpStatusText.SUCCESS, message: 'User has been created successfully'});
    }
))

const removeUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser){
        const error = new AppError('User is not found', 401, httpStatusText.ERROR);
        return next(error);
    }
    await User.findByIdAndDelete(findUser._id);
    res.status(200).json({status: httpStatusText.SUCCESS, message: '‘ser has been deleted successfully'})
  }
)

export { getUsers, addUser, removeUser };