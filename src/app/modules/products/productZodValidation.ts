import { z } from 'zod';

const createProduct = z.object({
  body: z.object({
    productName: z.string({
      required_error: 'Product name is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    status: z.boolean({
      required_error: 'Status is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    keyFeatures: z
      .string({
        required_error: 'Title is required',
      })
      .array(),
  }),
});
const createComment = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'User id is required',
    }),
    product: z.string({
      required_error: 'User id is required',
    }),
  }),
});

export const productZodSchema = { createProduct, createComment };
