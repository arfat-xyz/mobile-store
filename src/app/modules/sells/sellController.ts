import httpStatus from 'http-status';
import { SellService } from './sellService';
import { IData, ISell } from './sellInterface';
import catchAsync from '../../../Shared/cacheAsync';
import sendResponse from '../../../Shared/sentResponse';
import { Request, Response } from 'express';

const createSell = catchAsync(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const payload: ISell = { productId, quantity, userId: req?.user?._id };
  const result = await SellService.createSell(payload);
  sendResponse<ISell>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Sell created successfully.`,
    data: result,
  });
});
const getAllSell = catchAsync(async (req: Request, res: Response) => {
  const result = await SellService.getAllSell();
  sendResponse<ISell[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Sell created successfully.`,
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await SellService.getAllData();
  sendResponse<IData>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Sell created successfully.`,
    data: result,
  });
});
export const SellController = { createSell, getAllSell, getAllData };
