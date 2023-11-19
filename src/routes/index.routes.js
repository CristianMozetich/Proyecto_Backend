import { Router } from 'express';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import sessionRouter from './sessions.routes.js';
import userRouter from './sessions.routes.js';


const router = Router()


//ROUTES
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)



export default router