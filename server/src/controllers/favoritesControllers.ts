import { Request, Response, NextFunction } from 'express';
import Favorite from "../models/favoriteModel";
import { httpStatusText } from '../utils/httpStatusText';
import AppError from '../utils/appError';
import {asyncWrapper} from '../middlewares/asyncWrapper';

const getFavoritesList = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const email = req.body.email;
      if(!email){
        const error = new AppError('Email is required', 401, httpStatusText.ERROR);
        return next(error);
      }
      const list = await Favorite.find({email: email}, {"__v": false, "email": false});
      res.status(200).json({ status: httpStatusText.SUCCESS, data: list });
    }
  );
  
  const addToFavoritesList = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id, email, title, description, price, discountPercentage, brand, category, thumbnail, images } = req.body;
  
    if (!id || !email || !title || !description || !price || !discountPercentage || !brand || !category || !thumbnail || !images) {
      const error = new AppError('All details are required', 401, httpStatusText.ERROR);
      return next(error);
    }


    const newItem = new Favorite({
      id,
      email,
      title,
      description,
      price,
      discountPercentage,
      brand,
      category,
      thumbnail,
      images,
    });

    await newItem.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'The product has been added to your favorites list' });
  });
    
  const removeFromFavoritesList = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.productId;
    const findProduct = await Favorite.findOne({id: id});
    if (!findProduct) {
      const error = new AppError('This product is not found', 401, httpStatusText.ERROR);
      return next(error);
    }
  
    await Favorite.deleteOne({ id: id });  
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'The product has been removed from your favorites list' });
  });
  
export{
    getFavoritesList,
    addToFavoritesList,
    removeFromFavoritesList
}