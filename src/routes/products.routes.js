import { Router } from "express";
import { postProduct, getProductById, getProducts, putProductById, deleteProductById  } from "../controllers/products.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router()

productRouter.post('/', postProduct)

productRouter.get('/', getProducts)

productRouter.get('/:id', getProductById)

productRouter.put('/:id', passportError('jwt'), authorization('admin'), putProductById)

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProductById)




export default productRouter