import { NextFunction, Request, Response, Router } from 'express';
import zodValidateRequest from '../../middlewares/zodValidateRequest';
import { sellZodSchema } from './sellZod';
import { SellController } from './sellController';
import { auth } from '../../../middlewares/auth';

const router = Router();
router
  .route('/')
  .post(
    auth(),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.quantity = parseInt(req.body.quantity);
      next();
    },
    zodValidateRequest(sellZodSchema.createSell),
    SellController.createSell,
  )
  .get(auth(), SellController.getAllSell);
router.get('/data', auth(), SellController.getAllData);
export const SellRoutes = router;
