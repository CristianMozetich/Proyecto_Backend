import { Router } from 'express';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import sessionRouter from './sessions.routes.js';
import userRouter from './users.routes.js';
import mockingRouter from './mocking.routes.js';


const router = Router()

//ROUTES
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)

//Mocking Faker Router
router.use('/api/mockingproducts', mockingRouter)



export default router