// import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// import { User } from '../models/userModel';
// import { httpStatusText } from '../utils/httpStatusText';
// import { asyncWrapper } from '../middlewares/asyncWrapper';
// import AppError from '../utils/appError';

// const login = asyncWrapper(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userName, password } = req.body;

//     if (!userName || !password) {
//       const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
//       return next(error);
//     }

//     try {
//       const user = await User.findOne({ userName });

//       if (!user) {
//         const error = new AppError('Something is wrong', 401, httpStatusText.ERROR);
//         return next(error);
//       }

//       const matchPassword = await bcrypt.compare(password, user.password);

//       if (!matchPassword) {
//         const error = new AppError('Something is wrong', 401, httpStatusText.ERROR);
//         return next(error);
//       }

//       if (user && matchPassword) {
//         const token = jwt.sign({ userName, id: user._id }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1d' });
//         user.token = token;
//         res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
//       }
//     } catch (error) {
//       return next(error);
//     }
//   }
// );

// export { login };
