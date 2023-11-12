import { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel';
import { httpStatusText } from '../utils/httpStatusText';
import AppError from '../utils/appError';
import {asyncWrapper} from '../middlewares/asyncWrapper';

const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const query = req.query;

    const highestPrice = query.highestPrice;
    const lowestPrice = query.lowestPrice;
    
    const sortByLowestPrice = query.sortByLowestPrice;
    const sortByHighestPrice = query.sortByHighestPrice;
    
    let products;
    if(lowestPrice && highestPrice){
      products = await Product.find({price: { $gte: Number(lowestPrice), $lte: Number(highestPrice)}});
    }else if(sortByLowestPrice === '0'){
      products = await Product.find().sort({price: 1});
    }else if(sortByHighestPrice === '0'){
      products = await Product.find().sort({price: -1});
    }else{
      products = await Product.find();
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
  }
);

const getCategory = asyncWrapper(
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
        console.log(products)
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

const addProduct = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, discountPercentage, stock, brand, category, images} = req.body;

    if (!title || !description || !price || !stock || !stock || !brand || !category || !images) {
      const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
      return next(error);
    }

    const product = new Product({
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      images
    });

    await product.save();
    const products = await Product.find();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: products });
  }
);

const getProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.produtId;
    const product = await Product.find({ _id: id });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: product });
  }
);

const updateProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const produtId = req.params.produtId;
    await Product.updateOne({ _id: produtId }, { $set: { ...req.body } });
    const products = await Product.find();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
  }
);

const deleteProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const produtId = req.params.produtId;
    await Product.deleteOne({ _id: produtId });
    const products = await Product.find();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
  }
);

export {
  getAllProducts,
  getCategory,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
