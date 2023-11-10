/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import AppError from '../utils/appError';
import { httpStatusText } from '../utils/httpStatusText';
import jwt from 'jsonwebtoken';

interface CustomRequest{
    currentUser? : [string];
    headers: any;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    
    if(!authHeader || typeof authHeader !== 'string'){
        const error = new AppError('Token is required', 401, httpStatusText.ERROR);
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    
    try{
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
        req.currentUser = currentUser as any;
        next();
    }catch(err){
        const error = new AppError('Invalid code', 401, httpStatusText.ERROR);
        next(error);
    }
}

export default verifyToken;