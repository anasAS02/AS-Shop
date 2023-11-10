import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';
import { userRoles } from '../utils/userRoles';

const addAdmin = asyncWrapper((
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, country, address, role } = req.body;
        
        if (!name || !email || !password || !country || !email || !address || !role) {
            const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
            return next(error);
        }

        const admin = await User.findOne({ email });
            if (admin) {
            const error = new AppError('Choose another Email or Password', 401, httpStatusText.ERROR);
            return next(error);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            name,
            email,
            password: hashPassword,
            country,
            address,
            role
        })

        newAdmin.token = jwt.sign({role: newAdmin.role, email: newAdmin.email}, process.env.JWT_SECRET_KEY || '', {expiresIn: '1h'});
        await newAdmin.save();
        const admins = await User.find({role: userRoles.ADMIN});
        res.status(201).json({status: httpStatusText.SUCCESS, admins});
    }
))

const removeAdmin = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const findAdmin = await User.findOne({email: email});
    const role = findAdmin?.role;
    if(!findAdmin){
        const error = new AppError('Admin is not found', 401, httpStatusText.ERROR);
        return next(error);
    }else if(role !== userRoles.ADMIN){
        const error = new AppError('You cannot remove this user', 401, httpStatusText.FAIL);
        return next(error);
    }

    const admins = await User.find({role: userRoles.ADMIN});
    res.status(200).json({status: httpStatusText.SUCCESS, admins})
  }
)

const addManager = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, country, address, role } = req.body;
        if (!name || !email || !password || !country || !email || !address || !role) {
            const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
            return next(error);
        }

        const manager = await User.findOne({ email });
        if (manager) {
            const error = new AppError('Choose another Email or Password', 401, httpStatusText.ERROR);
            return next(error);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newManager = new User({
            name,
            email,
            password: hashPassword,
            country,
            address,
            role
        })

        newManager.token = jwt.sign({role: newManager.role, email: newManager.email}, process.env.JWT_SECRET_KEY || '', {expiresIn: '1h'});
        await newManager.save();
        const managers = await User.find({role: userRoles.MANAGER});
        res.status(201).json({status: httpStatusText.SUCCESS, managers});
  }
)

const removeManager = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const findManager = await User.findOne({email: email});
    const role = findManager?.role;
    if(!findManager){
        const error = new AppError('Manager is not found', 401, httpStatusText.ERROR);
        return next(error);
    }else if(role !== userRoles.MANAGER){
        const error = new AppError('You cannot remove this user', 401, httpStatusText.FAIL);
        return next(error);
    }

    const managers = await User.find({role: userRoles.MANAGER});
    res.status(200).json({status: httpStatusText.SUCCESS, managers})
  }
)

export { addAdmin, removeAdmin, addManager, removeManager };