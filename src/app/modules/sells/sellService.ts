import ApiError from '../../../errors/ApiErrors';
import { ProductModel } from '../products/prodcutSchema';
import { UserModel } from '../users/userSchema';
import { IData, ISell } from './sellInterface';
import { SellModel } from './sellSchema';

const createSell = async (payload: ISell) => {
  const user = await UserModel.count({ _id: payload.userId });
  const product = await ProductModel.findOne({ _id: payload.productId }).select(
    ['_id', 'quantity'],
  );
  console.log(user, product, payload);
  if (!user || !product?._id) {
    throw new ApiError(404, 'Data is not valid');
  }
  if (product?.quantity < payload.quantity) {
    throw new ApiError(404, 'Input product is higer than existing product');
  }
  await ProductModel.updateOne(
    { _id: payload?.productId },
    { quantity: product?.quantity - payload.quantity },
  );
  const result = await SellModel.create(payload);
  return result;
};
const getAllSell = async (): Promise<ISell[]> => {
  const result = await SellModel.find().populate(['userId', 'productId']);
  return result;
};
const getAllData = async (): Promise<IData> => {
  const day = await SellModel.aggregate([
    {
      $group: {
        _id: {
          $dayOfMonth: '$createdAt',
        },
        quantity: { $sum: '$quantity' },
      },
    },
  ]).then(all => all.map(d => ({ date: d._id, totalSales: d.quantity })));
  const week = await SellModel.aggregate([
    {
      $group: {
        _id: {
          $week: '$createdAt',
        },
        quantity: { $sum: '$quantity' },
      },
    },
  ]).then(all => all.map(w => ({ totalSales: w.quantity })));
  const month = await SellModel.aggregate([
    {
      $group: {
        _id: {
          $month: '$createdAt',
        },
        quantity: { $sum: '$quantity' },
      },
    },
  ]).then(all => all.map(w => ({ totalSales: w.quantity })));
  const year = await SellModel.aggregate([
    {
      $group: {
        _id: {
          $year: '$createdAt',
        },
        quantity: { $sum: '$quantity' },
      },
    },
  ]).then(all => all.map(w => ({ totalSales: w.quantity })));
  return { week, month, year, day };
};

export const SellService = { createSell, getAllSell, getAllData };
