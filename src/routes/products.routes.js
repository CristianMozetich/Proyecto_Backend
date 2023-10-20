import { Router } from "express";
import { postProduct, getProductById, getProducts, putProductById, deleteProductById  } from "../controllers/products.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get('/:id', getProductById)

productRouter.put('/:id', passportError('jwt'), authorization('admin'), putProductById)

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProductById)

productRouter.post('/', passportError('jwt'), authorization('admin'), postProduct)


export default productRouter