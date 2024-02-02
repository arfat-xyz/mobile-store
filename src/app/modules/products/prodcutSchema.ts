import { Schema, model } from 'mongoose';
import {
  IProdcutModel,
  IProduct,
  IComment,
  ICommentModel,
} from './productInterface';
const commentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  {
    timestamps: true,
  },
);
const productSchema = new Schema<IProduct, IProdcutModel>(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    keyFeatures: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    battery: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    camera: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const ProductModel = model<IProduct, IProdcutModel>(
  'Product',
  productSchema,
);
export const CommentModel = model<IComment, ICommentModel>(
  'Comment',
  commentSchema,
);
