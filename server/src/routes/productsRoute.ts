import express from 'express';
import multer from 'multer';
const router = express.Router();

import {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productsControllers';
import verifyToken from '../middlewares/verifyToken';
import allowedTo from '../middlewares/allowedTo';
import { userRoles } from '../utils/userRoles';

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
        .get(getAllProducts);

router.route('/add')
        .post(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), upload.single('thumbnail'), upload.array('images', 12), addProduct);

router.route('/project/:productId')
        .get(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), getProduct);

router.route('/update/:productId')
        .put(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), updateProduct);

router.route('/delete/:productId')
        .delete(verifyToken, allowedTo(userRoles.ADMIN || userRoles.MANAGER), deleteProduct);

export { router as productsRoute };
