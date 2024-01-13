import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/userModel';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';

const sendEmail = async (email: string, subject: string, text: string) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("Email sent successfully");
	} catch (error) {
		console.log("Email not sent!");
		console.log(error);
	}
};

const verifyEmail = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.params.token;
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    if (currentUser && typeof currentUser === 'object' && 'email' in currentUser) {
      await User.updateOne({ email: currentUser.email }, { $set: { verified: true } });
      return res.redirect('https://as-shop.vercel.app/Auth/Login');
    } else {
      return res.status(400).json({ error: 'Invalid token or missing email information' });
    }
  }catch(err){
    return next(err);
  }
}

const register = asyncWrapper((
    async(req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, country, address, phoneNumber, role } = req.body;

        if (!name || !email || !password || !address || !country || !phoneNumber) {
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
            role
        })

        newUser.token = jwt.sign({name: name, email: email, country: country, address: address,
        phoneNumber: phoneNumber, role: role},
        process.env.JWT_SECRET_KEY || '', {expiresIn: '1d'});
        await newUser.save();

        const url = `https://as-shop-ny7g.onrender.com/auth/confirm/${newUser.token}`;
        const subject = 'Verify Email Address for AS Shop';
        const text = `Confirm now: ${url}`;
        await sendEmail(newUser.email, subject, text);

        res.status(200).json({status: httpStatusText.SUCCESS, message: `A confirmation email has been sent to ${newUser.email}`})
}))

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
      const token = jwt.sign({name: user.name, email: user.email, country: user.country, address: user.address,
      phoneNumber: user.phoneNumber, role: user.role}, process.env.JWT_SECRET_KEY || '', { expiresIn: '1d' });
      user.token = token;
      if(user.verified){
        res.status(200).json({ status: httpStatusText.SUCCESS, User: { token, role: user.role, email: user.email }, verified: user.verified });
      }else{
        const url = `https://as-shop-ny7g.onrender.com/auth/confirm/${user.token}`;
        const email = user.email;
        const subject = 'Verify Email Address for AS Shop';
        const text = `Confirm now: ${url}`;
        await sendEmail(email, subject, text);
        res.status(200).json({status: httpStatusText.SUCCESS, message: `A confirmation email has been sent to ${user.email}`, verified: user.verified})
      }
    }
  }
);

const checkToken = asyncWrapper(
  async(req: Request, res: Response, next: NextFunction) => {
      const token = req.body.token;

      if(token){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt.verify(token, process.env.JWT_SECRET_KEY || '', (err: any) => {
          if(err){
            res.status(401).json({status: httpStatusText.FAIL, data: false})
          }else{
            res.status(200).json({status: httpStatusText.SUCCESS, data: true})
          }
        });
      }else{
        const error = new AppError('Token is required', 404, httpStatusText.ERROR);
        return next(error);
      }
  }
)

export { sendEmail, verifyEmail, register, login, checkToken };