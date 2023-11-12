import express from 'express';
import multer from 'multer';
import { getAllCategories, getCategory, getCategoryProducts, addCategory, updateCategory, deleteCategory } from '../controllers/categoriesControllers';

const router = express.Router();

const diskStorage = multer.diskStorage({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
        cb(null, 'uploads')
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filename: function (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: string) => void) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `category-${Date.now()}.${ext}`;
        cb(null, fileName)
    }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: express.Request, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => any) => {
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
            
router.route('/:category')
            .post(getCategory);

router.route('/products')
            .get(getCategoryProducts);

router.route('/add')
            .post(upload.single('thumbnail'), addCategory);

router.route('/:category')
            .put(upload.single('thumbnail'), updateCategory);

router.route('/:category')
            .delete(deleteCategory);

export { router as categoriesRoute };