import express from 'express';
import { getAllCategories, getCategory, getCategoryProducts, addCategory, updateCategory, deleteCategory } from '../controllers/categoriesControllers';
const router = express.Router();

router.route('/')
            .get(getAllCategories);

            
router.route('/:category')
            .post(getCategory);

router.route('/products')
            .get(getCategoryProducts);

router.route('/add')
            .post(addCategory);

router.route('/:category')
            .put(updateCategory);

router.route('/:category')
            .delete(deleteCategory);

export { router as categoriesRoute };