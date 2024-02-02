import httpStatus from 'http-status';
import catchAsync from '../../../Shared/cacheAsync';
import sendResponse from '../../../Shared/sentResponse';
import { IComment, IProduct } from './productInterface';
import { ProductService } from './productService';
import { Request, Response } from 'express';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { productFilterableFields } from './productConstant';
import { DeleteResult } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload: IProduct = req.body;
  const result = await ProductService.createProduct(payload);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product created successfully.`,
    data: result,
  });
});
const createComment = catchAsync(async (req: Request, res: Response) => {
  const payload: IComment = req.body;
  payload.user = (req.user as JwtPayload)._id;
  const result = await ProductService.createComment(payload);
  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product comment created successfully.`,
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product found successfully.`,
    data: result,
  });
});
const getSingleProductComments = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getSingleProductComments(id);
    sendResponse<IComment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Product coment successfully.`,
      data: result,
    });
  },
);
const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteSingleProduct(id);
  sendResponse<DeleteResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Product found successfully.`,
    data: result,
  });
});
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, productFilterableFields);
  const result = await ProductService.getAllProducts(
    paginationOptions,
    filters,
  );
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Produxt created successfully.`,
    meta: result.meta || null,
    data: result.data || null,
  });
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ProductService.updateProduct(id, payload);
  console.log('text');
  sendResponse<IProduct | string | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrived successfully',
    meta: null,
    data: result,
  });
});
export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
  createComment,
  getSingleProductComments,
};
