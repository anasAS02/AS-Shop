/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { httpStatusText } from './utils/httpStatusText';
import { authRoute } from './routes/authRoute';
import { productsRoute } from './routes/productsRoute';
import { managementRoute } from './routes/managementRoute';
import { userRoute } from './routes/userRoute';
import { categoriesRoute } from './routes/categoriesRoute';
import { favoritesRoute } from './routes/favoritesRoute';
import { ordersRoute } from './routes/ordersRoute';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;
const URL: string | undefined = process.env.MONGO_URL;

app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);
app.use('/user', userRoute);
app.use('/management', managementRoute);
app.use('/favorites', favoritesRoute);
app.use('/orders', ordersRoute);

import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

mongoose.connect(URL || '')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  app.all('*', (req, res) => {
    res.status(404).json({ status: 'Error', message: 'This resource is not available' });
  });

  app.use((err: any, req: express.Request, res: express.Response, next?: express.NextFunction) => {
    res.status(err.statusCode || 500).json({ status: err.statusText || httpStatusText.ERROR, message: err.message, code: err.statusCode || 500, data: null });
  });

app.listen(PORT, () => {
    console.log(`Running now on ${PORT} `)
})