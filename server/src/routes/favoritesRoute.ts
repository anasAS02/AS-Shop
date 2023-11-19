import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { getFavoritesList, addToFavoritesList, removeFromFavoritesList } from '../controllers/favoritesControllers';

const router = express.Router();

router.route('/')
  .post(getFavoritesList);

router.route('/add')
  .post(verifyToken, addToFavoritesList);

router.route('/remove')
  .post(verifyToken, removeFromFavoritesList);

export { router as favoritesRoute };