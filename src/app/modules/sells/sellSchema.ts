import { Schema, model } from 'mongoose';
import { ISell, ISellModel } from './sellInterface';
const sellSchema = new Schema<ISell, ISellModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const SellModel = model<ISell, ISellModel>('Sell', sellSchema);
