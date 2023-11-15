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
      products = await Product.find().sort({createdAt: -1});
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
  }
);

const addProduct = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, discountPercentage, stock, brand, category } = req.body;
    if (!title || !description || !price || !discountPercentage || !stock || !brand || !category) {
      const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
      return next(error);
    }
    const thumbnailFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['thumbnail']?.[0];
    const thumbnail: string = thumbnailFile?.filename || '';

    const images: string[] = (req.files! as { [fieldname: string]: Express.Multer.File[] })['images']?.map((file: Express.Multer.File) => file.filename) || [];
    const newProduct = new Product ({
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      thumbnail,
      images
    });

    await newProduct.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, message: 'Product has been created successfully' });
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
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const findProduct = await Product.findOne({_id: productId});

    const thumbnailFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['thumbnail']?.[0];
    const thumbnail: string = thumbnailFile?.filename || '';

    const images: string[] = (req.files! as { [fieldname: string]: Express.Multer.File[] })['images']?.map((file: Express.Multer.File) => file.filename) || [];

    if(!findProduct){
      const error = new AppError('This product is not found', 404, httpStatusText.ERROR);
      return next(error);
    }

    if(thumbnail && !images){
      console.log('thumbnail && !images')
      await Product.updateOne({ _id: productId }, {$set: {... req.body, thumbnail}})
    }else if(images && !thumbnail){
      console.log('images && !thumbnail')
      await Product.updateOne({ _id: productId }, {$set: {... req.body, images}})
    }else if(thumbnail && images){
      console.log('thumbnail && images')
      await Product.updateOne({ _id: productId }, {$set: {... req.body, thumbnail, images}})
    }else if(!thumbnail && !images){
      console.log('!thumbnail && !images')
      await Product.updateOne({ _id: productId }, { $set: { ...req.body } });
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Product has been updated successfully' });
  }
);

const deleteProduct = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const findProduct = await Product.findOne({_id: productId});
    if(!findProduct){
      const error = new AppError('This product is not found', 404, httpStatusText.ERROR);
      return next(error);
    }
    await Product.deleteOne({_id: findProduct._id});
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Product has been deleted successfully' });
  }
);

export {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
