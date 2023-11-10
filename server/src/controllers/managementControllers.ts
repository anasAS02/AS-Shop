import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import { httpStatusText } from '../utils/httpStatusText';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AppError from '../utils/appError';

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
        res.status(201).json({status: httpStatusText.SUCCESS, data: null});
    }
))

const removeAdmin = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {

  }
)

const addManager = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    
  }
)

const removeManager = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {

  }
)

export { addAdmin, removeAdmin, addManager, removeManager };