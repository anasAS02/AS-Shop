/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { httpStatusText } from "../utils/httpStatusText";

interface CustomRequest extends Request {
    currentUser?: {
        [role: string]: any;
    };
}

const allowedTo = (...roles: [string]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if(!roles.includes(req.currentUser?.role)){
            const error = new AppError('this role is not authorized', 401, httpStatusText.FAIL);
            return next(error);
        }
        next();
    }
}

export default allowedTo;
