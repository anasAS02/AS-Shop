import mongoose, { Document, Schema, Model } from 'mongoose';

export interface OrderItemType {
  title: string;
  thumbnail: string;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  email: string;
  items: OrderItemType[];
  delivered: boolean;
  paid: boolean;
  totalAmount: number;
  orderId: string;
}

export interface OrderDocument extends Document, Order {}

export interface OrderModel extends Model<OrderDocument> {}

const orderItem = new Schema<OrderItemType>(
  {
    title: String,
    thumbnail: String,
    quantity: Number,
    totalPrice: Number,
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDocument>(
  {
    email: {
      type: String,
      required: true
    },
    items: [orderItem],
    delivered: {
      type: Boolean,
      default: false
    },
    paid: {
      type: Boolean,
      default: false
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: true }
);

const Order = mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);

export { Order };
