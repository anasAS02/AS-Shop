import { Request, Response } from 'express';
import Product from '../models/productModel';
import { httpStatusText } from '../utils/httpStatusText';
// import AppError from '../utils/appError';
import {asyncWrapper} from '../middlewares/asyncWrapper';

const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const query = req.query;
    const limit = parseInt(query.limit as string) || 10;
    const page = parseInt(query.page as string) || 1;
    const skip = (page - 1) * limit;

    const highestPrice = query.highestPrice;
    const lowestPrice = query.lowestPrice;
    
    const sortByLowestPrice = query.sortByLowestPrice;
    const sortByHighestPrice = query.sortByHighestPrice;
    
    let products;
    if(lowestPrice && highestPrice){
      products = await Product.find().where('price').gt(Number(lowestPrice)).lt(Number(highestPrice));
    }else if(sortByLowestPrice){
      products = await Product.find().sort({price: 1});
    }else if(sortByHighestPrice){
      products = await Product.find().sort({price: -1});
    }else{
      products = await Product.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
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
        products = await Product.find({category: category}).where('price').gt(Number(lowestPrice)).lt(Number(highestPrice));
      }else if(sortByLowestPrice){
        products = await Product.find({category: category}).sort({price: 1});
      }else if(sortByHighestPrice){
        products = await Product.find({category: category}).sort({price: -1});
      }else{
        products = await Product.find({category: category}).sort({ createdAt: -1 });
      }
      res.status(200).json({ status: httpStatusText.SUCCESS, data: products });
    }
);

// const addProject = asyncWrapper(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { title, liveLink, sourceCode, img, desc, tools, test } = req.body;

//     if (!title || !liveLink || !sourceCode || !img || !desc || !tools.length) {
//       const error = new AppError('All fields are required', 401, httpStatusText.ERROR);
//       return next(error);
//     }

//     const project = new Project({
//       title,
//       liveLink,
//       sourceCode,
//       img,
//       desc,
//       tools,
//       test,
//     });

//     await project.save();
//     const projects = await Project.find();
//     res.status(201).json({ status: httpStatusText.SUCCESS, data: projects });
//   }
// );

// const getProject = asyncWrapper(
//   async (req: Request, res: Response) => {
//     const id = req.params.projectId;
//     const project = await Project.find({ _id: id });
//     res.status(200).json({ status: httpStatusText.SUCCESS, data: project });
//   }
// );

// const updateProject = asyncWrapper(
//   async (req: Request, res: Response) => {
//     const projectId = req.params.projectId;
//     await Project.updateOne({ _id: projectId }, { $set: { ...req.body } });
//     const projects = await Project.find();
//     res.status(200).json({ status: httpStatusText.SUCCESS, data: projects });
//   }
// );

// const deleteProject = asyncWrapper(
//   async (req: Request, res: Response) => {
//     const projectId = req.params.projectId;
//     await Project.deleteOne({ _id: projectId });
//     const projects = await Project.find();
//     res.status(200).json({ status: httpStatusText.SUCCESS, data: projects });
//   }
// );

export {
  getAllProducts,
  getCategory
  // addProject,
  // getProject,
  // updateProject,
  // deleteProject,
};
