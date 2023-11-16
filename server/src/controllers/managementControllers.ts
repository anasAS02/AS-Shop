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
        const { name, email, password, country, address, phoneNumber, role } = req.body;
        
        if (!name || !email || !password || !country || !address || !phoneNumber || !role) {
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
            verified: true
        })

        newUser.token = jwt.sign({role: newUser.role, email: newUser.email}, process.env.JWT_SECRET_KEY || '', {expiresIn: '1d'});
        await newUser.save();
        res.status(201).json({status: httpStatusText.SUCCESS, message: 'User has been created successfully'});
    }
))

const changeRole = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role } = req.body.id;
    const findUser = await User.findOne({_id: userId});
    if(!findUser){
        const error = new AppError('User is not found', 401, httpStatusText.ERROR);
        return next(error);
    }

    if(role === userRoles.ADMIN){
        await User.updateOne({_id: findUser._id}, {$set: {... req.body, role: userRoles.MANAGER}});
    }else if(role === userRoles.MANAGER){
        await User.updateOne({_id: findUser._id}, {$set: {... req.body, role: userRoles.ADMIN}});
    }
    res.status(200).json({status: httpStatusText.SUCCESS, message: 'Role has been updated successfully'})
  }
)

const removeRole = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role } = req.body;
    const findUser = await User.findOne({_id: userId});
    if(!findUser){
        const error = new AppError('User is not found', 401, httpStatusText.ERROR);
        return next(error);
    }
    if(findUser.role === userRoles.MANAGER){
        if(role === userRoles.MANAGER){
            await User.updateOne({_id: findUser._id}, {$set: {... req.body, role: userRoles.USER}});
        }else{
            const error = new AppError('You cannot remove this role', 401, httpStatusText.ERROR);
            return next(error);
        }
    }else{
        await User.updateOne({_id: findUser._id}, {$set: {... req.body, role: userRoles.USER}});
    }
    res.status(200).json({status: httpStatusText.SUCCESS, message: 'Role has been removed successfully'})
  }
)

export { getUsers, addUser, changeRole, removeRole };