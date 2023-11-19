import { Request, Response, NextFunction } from 'express';
import {asyncWrapper} from '../middlewares/asyncWrapper';
import Order from '../models/orderModel';
import {httpStatusText} from '../utils/httpStatusText';
import stripe from 'stripe';
import AppError from '../utils/appError';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripeInstance = new stripe(stripeSecretKey);

const getAllOrders = asyncWrapper(
  async (req: Request, res: Response) => {
    const orders = await Order.find({}, { __v: false });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { orders } });
  }
);

const getMyOrders = asyncWrapper(
  async (req: Request, res: Response) => {
    const userEmail = req.body.email;
    const orders = await Order.find({ email: userEmail });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { orders } });
  }
);

const createOrder = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      submit_type: 'auto',
      line_items: req.body.items.map((item: any) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: 'https://audio-phile-shop.vercel.app/success',
      cancel_url: 'https://audio-phile-shop.vercel.app/cart',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const saveOrder = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { items, totalAmount, email } = req.body;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const { title, quantity, price, thumbnail } = item;
      if (!title || !quantity || !price || !thumbnail) {
        const err = new AppError('Invalid item data', 400, httpStatusText.ERROR);
        return next(err);
      }
      const orderItem: OrderItem = {
        title,
        thumbnail,
        price,
        quantity,
      };
      orderItems.push(orderItem);
    }

    const newOrder = new Order({
      items: orderItems,
      totalAmount,
      email,
    } as OrderDocument);

    await newOrder.save();
    res.status(200).json('done');
  }
);

export default {
  getAllOrders,
  getMyOrders,
  createOrder,
  saveOrder,
};
