import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { CommentModel, ProductModel } from './prodcutSchema';
import { IComment, IProduct, IProductFilters } from './productInterface';
import { productSearchableFields } from './productConstant';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

const createProduct = async (payload: IProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};
const createComment = async (payload: IComment) => {
  const result = await CommentModel.create(payload);
  return result;
};
const getSingleProduct = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};
const getSingleProductComments = async (id: string) => {
  const result = await CommentModel.find({ product: id }).populate([
    'user',
    'product',
  ]);
  return result;
};
const deleteSingleProduct = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const exist = await ProductModel.findOne({ _id: id });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await ProductModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const getAllProducts = async (
  paginationOptions: IPaginationOptions,
  filters: IProductFilters,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, max, ...filtersFields } = filters;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (max !== undefined) {
    andCondition.push({
      price: {
        $lte: max, // Assuming you want products with max value less than or equal to the specified max
      },
      quantity: {
        $gt: 0,
      },
    });
  }
  if (Object.keys(filtersFields).length) {
    andCondition.push({
      $and: Object.entries(filtersFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await ProductModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ProductModel.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
  createComment,
  getSingleProductComments,
};
