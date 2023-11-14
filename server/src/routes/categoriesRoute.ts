import express, { Request } from 'express';
import multer from 'multer';
import { getAllCategories, getCategory, getCategoryProducts, addCategory, updateCategory, deleteCategory } from '../controllers/categoriesControllers';

const router = express.Router();

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileName = `category-${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: Request, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => any) => {
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image'){
        return cb(null, true);
    }else{
        return cb(null, false)
    }
}

const upload = multer({storage: diskStorage, fileFilter});

router.route('/')
  .get(getAllCategories);

router.route('/add')
  .post(upload.single('thumbnail'), addCategory);

router.route('/update/:categoryId')
  .put(upload.single('thumbnail'), updateCategory)

router.route('/:categoryId')
  .get(getCategory)
  .delete(deleteCategory);

router.route('/products')
  .get(getCategoryProducts);

export { router as categoriesRoute };