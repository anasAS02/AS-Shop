import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';

const getInfo = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const email = req.body.email;
        if(!email){
          const error = new AppError('Email is required', 404, httpStatusText.ERROR);
          return next(error);
        }
        const user = await User.findOne({email: email});
        if(user){
          const userData = {
            name: user.name,
            country: user.country,
            address: user.address,
            phoneNumber: user.phoneNumber
          }
        res.status(200).json({status: httpStatusText.SUCCESS, data: userData});
      }
    }
  )
  
  const changeName = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const name = req.body.name;
      const email = req.query.email;

      if(!email) {
        const error = new AppError('Email is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!name){
        const error = new AppError('New name is required', 404, httpStatusText.ERROR);
        return next(error);
      }

      const user = await User.findOne({email: email});

      if(user){
        await User.updateOne({email: user.email}, { $set: { name: name }});
        res.status(200).json({status: httpStatusText.SUCCESS, message: 'Name has been changed successfully'});
      }
    }
  )

  const changePassword = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const {currentPassword, newPassword} = req.body;
      const email = req.query.email;
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

  const changeAddress = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const address = req.body.address;
      const email = req.query.email;
      if(!email) {
        const error = new AppError('Email is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!address){
        const error = new AppError('New address is required', 404, httpStatusText.ERROR);
        return next(error);
      }

      const user = await User.findOne({email: email});

      if(user){
        await User.updateOne({email: user.email}, { $set: { address: address }});
        res.status(200).json({status: httpStatusText.SUCCESS, message: 'Address has been changed successfully'});
      }
    }
  )

const changeCountry = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const country = req.body.country;
      const email = req.query.email;

      if(!email) {
        const error = new AppError('Email is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!country){
        const error = new AppError('Country is required', 404, httpStatusText.ERROR);
        return next(error);
      }

      const user = await User.findOne({email: email});

      if(user){
        await User.updateOne({email: user.email}, { $set: { country: country }});
        res.status(200).json({status: httpStatusText.SUCCESS, message: 'Country has been changed successfully'});
      }
    }
)

const changePhoneNumber = asyncWrapper(
    async(req: Request, res: Response, next: NextFunction) => {
      const phoneNumber = req.body.phoneNumber;
      const email = req.query.email;

      if(!email) {
        const error = new AppError('Email is required', 404, httpStatusText.ERROR);
        return next(error);
      }else if(!phoneNumber){
        const error = new AppError('New phone number is required', 404, httpStatusText.ERROR);
        return next(error);
      }

      const user = await User.findOne({email: email});

      if(user){
        await User.updateOne({email: user.email}, { $set: { phoneNumber: phoneNumber }});
        res.status(200).json({status: httpStatusText.SUCCESS, message: 'Phone number has been changed successfully'});
      }
    }
  )

export { getInfo, changeName, changePassword, changeCountry, changeAddress, changePhoneNumber}