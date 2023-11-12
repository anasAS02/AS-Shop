import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/userModel';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';

const getInfo = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const token = req.body.token;
        if(!token){
          const error = new AppError('Token is required', 404, httpStatusText.ERROR);
          return next(error);
        }
        const user = await jwt.decode(token, {complete: true}) as JwtPayload;
        if(user){
        res.status(200).json({status: httpStatusText.SUCCESS, data: {name: user?.payload.name, email: user?.payload.email,
        country: user?.payload.country, address: user?.payload.address, phoneNumber: user?.payload.phoneNumber }});
      }
    }
  )
  
  const changeName = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const {email, newName} = req.body;

      if(!email) {
        const error = new AppError('Email is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!newName){
        const error = new AppError('New name is required', 404, httpStatusText.ERROR);
        return next(error);
      }

      const user = await User.findOne({email: email});

      if(user){
        await User.updateOne({email: user.email}, { $set: { name: newName }});
        res.status(200).json({status: httpStatusText.SUCCESS, message: 'Name has been changed successfully'});
      }
    }
  )

  const changePassword = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const {email, currentPassword, newPassword} = req.body;
      if(!email) {
        const error = new AppError('Email is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!currentPassword){
        const error = new AppError('Current password is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!newPassword){
        const error = new AppError('New password is required', 404, httpStatusText.ERROR);
        return next(error);
      }
      const user = await User.findOne({email: email});
      if(newPassword.length < 8){
        const error = new AppError('minimum is 8 charters', 401, httpStatusText.ERROR);
        return next(error);
      }
      if(user){
        const matchPassword = await bcrypt.compare(currentPassword, user.password);
        if(matchPassword){
          const hashPassword = await bcrypt.hash(newPassword, 10);
          await User.updateOne({email: user.email}, { $set: { password: hashPassword }});
          res.status(200).json({status: httpStatusText.SUCCESS, message: 'Password has been changed successfully'});
        }else{
          const error = new AppError('This password is wrong', 401, httpStatusText.ERROR);
          return next(error);
        }
      }
    }
  )

export { getInfo, changeName, changePassword}