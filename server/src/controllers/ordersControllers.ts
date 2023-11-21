import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { Order, OrderDocument, OrderItemType } from '../models/orderModel';
import { httpStatusText } from '../utils/httpStatusText';
import stripe from 'stripe';
import AppError from '../utils/appError';
import { BASE_URL } from '../../../Client/src/Utils/Apis'
import dotenv from 'dotenv';
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
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

const createOrder = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, totalAmount, email, orderId } = req.body;
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      submit_type: 'auto',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      line_items: items.map((item: any) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images: [item.thumbnail]
            },
            unit_amount: Math.round(item.totalPrice * 100),
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${BASE_URL}orders/confirm/${orderId}`,
      cancel_url: `http://localhost:3000`,
    });
    const orderItems: OrderItemType[] = [];
    for (const item of items) {
      const { title, quantity, totalPrice, thumbnail } = item;
      if (!title || !quantity || !totalPrice || !thumbnail) {
        const err = new AppError('Invalid item data', 400, httpStatusText.ERROR);
        return next(err);
      }
      const orderItem: OrderItemType = {
        title,
        thumbnail,
        totalPrice: totalPrice * quantity,
        quantity,
      };
      orderItems.push(orderItem);
    }

    const newOrder = new Order({
      items: orderItems,
      totalAmount,
      email,
      orderId,
      delivered: false,
      paid: false,
    } as OrderDocument);

    await newOrder.save();
    res.json({ url: session.url });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

const confirmOrder = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;
    const findOrder = await Order.findOne({orderId: orderId});
    if(!findOrder){
      const error = new AppError('Order is not found', 404, httpStatusText.ERROR);
      return next(error);
    }
    await Order.updateOne({orderId: findOrder?.orderId},  { $set: { paid: true } });
    res.redirect('http://localhost:3000/Profile');
  }
);

export default {
  getAllOrders,
  getMyOrders,
  createOrder,
  confirmOrder,
};
