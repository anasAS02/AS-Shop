import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/userModel';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';

const sendEmail = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, subject, text } = req.body;
      
      if(!email || !subject || !text){
        const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
        return next(error);
      }
  
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.USER, 
          pass: process.env.PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: httpStatusText.FAIL, message: 'Email not sent' });
        } else {
          console.log(`Email sent: ${info.response}`);
          res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Email sent successfully' });
        }
      });
    }
  );

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

    const user = await User.findOne({ email });

    if (!user){
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
  }
);

export { sendEmail, register, login };
