import { Model, ObjectId } from 'mongoose';

export type IComment = {
  user: ObjectId;
  comment: string;
  product: ObjectId;
};
export type IProduct = {
  image: string;
  productName: string;
  price: number;
  status: boolean;
  description: string;
  battery: string;
  brand: string;
  model: string;
  os: string;
  camera: string;
  size: string;
  storage: string;
  quantity: number;
  keyFeatures: string[];
};
export type ICommentModel = Model<IComment, Record<string, unknown>>;
export type IProdcutModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  productName?: string;
  category?: string;
  description?: string;
  keyFeatures?: string;
  searchTerm?: string;
  status?: boolean;
  battery?: string;
  brand?: string;
  model?: string;
  os?: string;
  camera?: string;
  size?: string;
  storage?: string;
  quantity?: number;
  max?: number;
};
