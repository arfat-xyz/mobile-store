import { z } from 'zod';

const createSell = z.object({
  body: z.object({
    productId: z.string({
      required_error: 'Product id is required',
    }),
    quantity: z.number({
      required_error: 'Quantity is required',
    }),
  }),
});

export const sellZodSchema = { createSell };
