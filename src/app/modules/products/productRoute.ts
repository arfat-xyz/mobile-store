import { Router } from 'express';
import { ProductController } from './productController';
import { productZodSchema } from './productZodValidation';
import zodValidateRequest from '../../middlewares/zodValidateRequest';
import { auth } from '../../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(),
  zodValidateRequest(productZodSchema.createProduct),
  ProductController.createProduct,
);
router.post(
  '/comment',
  auth(),
  zodValidateRequest(productZodSchema.createComment),
  ProductController.createComment,
);
router.get('/comment/:id', auth(), ProductController.getSingleProductComments);
router.get('/', auth(), ProductController.getAllProducts);
router.get('/:id', auth(), ProductController.getSingleProduct);
router.put('/:id', auth(), ProductController.updateProduct);
router.delete('/:id', auth(), ProductController.deleteSingleProduct);
export const ProductRoutes = router;
