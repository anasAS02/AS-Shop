import { Request, Response, NextFunction } from 'express';
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

const addProduct = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, discountPercentage, stock, brand, category} = req.body;
    const images: string[] = (req?.files as Express.Multer.File[])?.map((file: Express.Multer.File) => file.filename);
    if (!title || !description || !price || !stock || !stock || !brand || !category || images.length === 0) {
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
      thumbnail: req?.file?.filename,
      images
    });

    await product.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: product });
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
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  }
);

const deleteProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const produtId = req.params.produtId;
    await Product.deleteOne({ _id: produtId });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  }
);

export {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
