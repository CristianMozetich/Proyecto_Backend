import { Router } from 'express';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import sessionRouter from './sessions.routes.js';
import userRouter from './users.routes.js';
import mockingRouter from './mocking.routes.js';
import express from 'express';
import path from 'path';


const router = Router()


//ROUTES
router.use('/api/users', userRouter)
// Configura express.static para manejar archivos estáticos en la ruta /api/users/images
router.use('/api/users/images', express.static(path.join(__dirname, '../../upload/products')));

router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)

//Mocking Faker Router
router.use('/api/mockingproducts', mockingRouter)



export default router