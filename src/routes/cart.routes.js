import { Router } from "express";
import { getCartById, deleteAndUpdateCartById, deleteCart, postCart, updateCartById } from "../controllers/cart.controllers.js";
import { checkout, purchaseCart } from "../controllers/orders.controllers.js";


const cartRouter = Router()

cartRouter.get('/:id', getCartById)

cartRouter.post('/', postCart)

cartRouter.post('/:cid/products/:pid', updateCartById);

cartRouter.delete('/:cid/products/:pid', deleteAndUpdateCartById);

cartRouter.delete('/:cid', deleteCart);

cartRouter.post('/:cid/purchase',  checkout)



export default cartRouter