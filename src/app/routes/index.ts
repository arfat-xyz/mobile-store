import { Router } from 'express';
import { ProductRoutes } from '../modules/products/productRoute';
import { UserRoutes } from '../modules/users/userRouter';
import { SellRoutes } from '../modules/sells/sellRoutes';

const router = Router();
const modulesRoute = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/sell',
    route: SellRoutes,
  },
];
modulesRoute.filter(mR => router.use(mR.path, mR.route));
export default router;
