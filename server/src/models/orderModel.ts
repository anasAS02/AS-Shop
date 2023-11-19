import mongoose, { Document, Schema } from 'mongoose';

interface OrderItemType {
  title: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

interface Order extends Document {
  email: string;
  items: OrderItemType[];
  totalAmount: number;
}

const orderItem = new Schema<OrderItemType>(
  {
    title: String,
    thumbnail: String,
    quantity: Number,
    price: Number,
  },
  { _id: false }
);

const orderSchema = new Schema<Order>(
  {
    email: String,
    items: [orderItem],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, _id: true }
);

const OrderModel = mongoose.model<Order>('Order', orderSchema);

export default OrderModel;
