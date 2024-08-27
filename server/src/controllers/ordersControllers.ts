import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { Order, OrderDocument, OrderItemType } from '../models/orderModel';
import { httpStatusText } from '../utils/httpStatusText';
import stripe from 'stripe';
import AppError from '../utils/appError';
import dotenv from 'dotenv';
import { sendEmail } from './authControllers';
import { User } from '../models/userModel';
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeInstance = new stripe(stripeSecretKey || '');

const getAllOrders = asyncWrapper(
  async (req: Request, res: Response) => {
    
    interface orders {
      email: string;
      items: { title: string, thumbnail: string , totalPrice: number, quantity: number}[];
      totalAmount: number;
      delivered: boolean;
      createdAt: string;
    }

    const orders: orders[] = await Order.find({paid: true});
    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of orders) {
      const createdAtDate = new Date(order.createdAt);
    
      if (!isNaN(createdAtDate.getTime())) {
        const month = createdAtDate.getMonth();
        let revenueForOrder = 0;
    
        for (const item of order.items) {
          revenueForOrder += item.totalPrice;
        }
    
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
      } else {
        console.error(`Invalid createdAt date: ${order.createdAt}`);
      }
    }
    
    const graphData: { name: string; total: number }[] = [
      { name: 'Jan', total: 0 },
      { name: 'Feb', total: 0 },
      { name: 'Mar', total: 0 },
      { name: 'Apr', total: 0 },
      { name: 'May', total: 0 },
      { name: 'Jun', total: 0 },
      { name: 'Jul', total: 0 },
      { name: 'Aug', total: 0 },
      { name: 'Sep', total: 0 },
      { name: 'Oct', total: 0 },
      { name: 'Nov', total: 0 },
      { name: 'Dec', total: 0 },
    ];
    
    for (const month in monthlyRevenue) {
      graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }
    
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { orders, graphData } });
  }
);

const getMyOrders = asyncWrapper(
  async (req: Request, res: Response) => {
    const userEmail = req.body.email;
    const orders = await Order.find({ email: userEmail, paid: true }).sort({createdAt: -1});
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { orders } });
  }
);

const createOrder = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  interface itemType {
    title: string;
    thumbnail: string;
    quantity: number;
    totalPrice: number;
  }
  try {
    const { items, totalAmount, email, orderId } = req.body;
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      submit_type: 'auto',
      line_items: items.map((item: itemType) => {
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
      success_url: `https://as-shop-server.vercel.app/orders/confirm/${orderId}`,
      cancel_url: `https://as-shop.vercel.app/`,
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
    const findUser = await User.findOne({email: findOrder.email});
    const address = findUser?.address;
    await Order.updateOne({orderId: findOrder?.orderId},  { $set: { paid: true } });
    await sendEmail(findOrder.email, 'Your order from AS-Shop', `Great news! Your order has been booked and is currently in transit to ${address}. Keep an eye out for its arrival.`)
    res.redirect('https://as-shop.vercel.app/Profile');
  }
);

const updateOrderStatus = asyncWrapper(
  async(req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    const findOrder = await Order.findOne({_id: orderId});
    if(!findOrder){
      const error = new AppError('This order id is not found', 404, httpStatusText.ERROR);
      return next(error);
    }

    await Order.updateOne({_id: findOrder?._id},  { $set: { delivered: true } });
    await sendEmail(findOrder.email, 'Your order from AS-Shop', 'Good news! Your order has been successfully handed over. Thank you for choosing us. We invite you to explore our products and shop with us again.')
    res.status(200).json({status: httpStatusText.SUCCESS, message: 'Order status has been updated.'});
  }
)

export default {
  getAllOrders,
  getMyOrders,
  createOrder,
  confirmOrder,
  updateOrderStatus,
};
