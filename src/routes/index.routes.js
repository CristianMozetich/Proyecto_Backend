import { Router } from 'express';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import sessionRouter from './sessions.routes.js';
import userRouter from './users.routes.js';
import mockingRouter from './mocking.routes.js';
import express from 'express';
import path from 'path';


const router = Router()

const __filename = import.meta.url.substring("file:///".length);
const __dirname = path.dirname(__filename);
// Configura express.static para manejar archivos estáticos en la ruta /api/users/images
router.use('/api/users/images', express.static(path.join(__dirname, '../../upload/products')));

//ROUTES
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)

//Mocking Faker Router
router.use('/api/mockingproducts', mockingRouter)



export default router