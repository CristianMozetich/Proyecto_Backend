import { Router } from "express";
import { getfakerProducts } from "../controllers/mocking.controllers.js";

const mockingRouter = Router()

mockingRouter.get('/', getfakerProducts)

export default mockingRouter

