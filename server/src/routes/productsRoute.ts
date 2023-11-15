import express, {Request} from 'express';
import multer from 'multer';
const router = express.Router();

import {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productsControllers';
import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileName = `products-${Date.now()}-${file.originalname}`;
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
        .get(getAllProducts);

router.route('/add')
        .post(upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 12 }]), addProduct);

router.route('/:productId')
        .get(verifyToken, allowedTo(userRoles.USER || userRoles.MANAGER), getProduct)
        .put(upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 12 }]), updateProduct)
        .delete(deleteProduct);

export { router as productsRoute };
