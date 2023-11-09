import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { httpStatusText } from './utils/httpStatusText';
import { authRoute } from './routes/authRoute';
import { productsRoute } from './routes/productsRoute';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;
const URL: string | undefined = process.env.MONGO_URL;

app.use('/auth', authRoute);
app.use('/products', productsRoute);


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
  
  interface CustomError {
    statusCode: number;
    statusText: string;
    message: string;
  }

  app.use((err: CustomError, req: express.Request, res: express.Response) => {
    res.status(err.statusCode || 500).json({ status: err.statusText || httpStatusText.ERROR, message: err.message, code: err.statusCode || 500, data: null });
  });

app.listen(PORT, () => {
    console.log(`Running now on ${PORT} `)
})