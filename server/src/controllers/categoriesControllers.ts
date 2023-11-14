import { Request, Response, NextFunction } from 'express';
import Category from "../models/categoryModel";
import Product from "../models/productModel";
import { httpStatusText } from '../utils/httpStatusText';
import AppError from '../utils/appError';
import {asyncWrapper} from '../middlewares/asyncWrapper';

const getAllCategories = asyncWrapper(
    async (req: Request, res: Response) => {
      const categories = await Category.find();
      res.status(200).json({ status: httpStatusText.SUCCESS, data: categories });
    }
  );

const getCategory = asyncWrapper(
    async (req: Request, res: Response) => {
      const categoryName = req.params.category;
      const category = await Category.find({title: categoryName});
      res.status(200).json({ status: httpStatusText.SUCCESS, data: category });
    }
  );
  
const getCategoryProducts = asyncWrapper(
async (req: Request, res: Response) => {
    const query = req.query;
    const category = req.params.category;
    
    const highestPrice = query.highestPrice;
    const lowestPrice = query.lowestPrice;
    const sortByLowestPrice = query.sortByLowestPrice;
    const sortByHighestPrice = query.sortByHighestPrice;
    let products;
    if(lowestPrice && highestPrice){
        products = await Product.find({category: category, price: { $gte: Number(lowestPrice), $lte: Number(highestPrice)}});
    }else if(sortByLowestPrice === '0'){
        products = await Product.find({category: category}).sort({price: 1});
    }else if(sortByHighestPrice === '0'){
        products = await Product.find({category: category}).sort({price: -1});
    }else{
        products = await Product.find({category: category}).sort({ createdAt: -1 });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
    }
);

const addCategory = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const {title, href} = req.body;
      
      if(!title || !href){
        const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
        return next(error);
      }

      const newCategory = new Category({
        title,
        href,
        thumbnail: req?.file?.filename
      })
      await newCategory.save();
      res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Category has been added successfully' });
    }
);

const updateCategory = asyncWrapper(
    async (req: Request, res: Response) => {
      const categoryId = req.params.categoryId;
      if(req.file){
        await Category.updateOne({_id: categoryId}, {$set: {... req.body, thumbnail: req.file.filename}})
      }
      await Category.updateOne({_id: categoryId}, {$set: {... req.body}})
      res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Category has been updated successfully' });
    }
);

const deleteCategory = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const categoryId = req.params.categoryId;
      const findCategory = await Category.findOne({_id: categoryId});
      if(!findCategory){
        const error = new AppError('This category is not found', 404, httpStatusText.ERROR);
        return next(error);
      }
      await Product.deleteMany({category: findCategory.title});
      await Category.deleteOne({_id: findCategory._id});
      res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Category has been deleted successfully' });
    }
);

export{
    getAllCategories,
    getCategory,
    getCategoryProducts,
    addCategory,
    updateCategory,
    deleteCategory
}