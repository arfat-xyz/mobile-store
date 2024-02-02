import { Model, ObjectId } from 'mongoose';

export type ISell = {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  quantity: number;
};
export type IData = {
  week: { totalSales: number }[];
  day: { totalSales: number }[];
  month: { totalSales: number }[];
  year: { totalSales: number }[];
};
export type ISellModel = Model<ISell, Record<string, unknown>>;
