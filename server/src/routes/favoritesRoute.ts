import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { addToFavoritesList, getFavoritesList } from '../controllers/favoritesControllers';

const router = express.Router();

router.route('/')
  .post(getFavoritesList);

router.route('/add')
  .post(verifyToken, addToFavoritesList);

export { router as favoritesRoute };