import { Router } from 'express';
import userRouter from './user-router';
import translatorRouter from './translator-router';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/translator', translatorRouter);

// Export default.
export default baseRouter;
