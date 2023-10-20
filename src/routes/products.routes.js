import { Router } from "express";
import { postProduct, getProductById, getProducts, putProductById, deleteProductById  } from "../controllers/products.controllers.js";

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get('/:id', getProductById)

productRouter.put('/:id', putProductById)

productRouter.delete('/:id', deleteProductById)

productRouter.post('/', postProduct)


export default productRouter