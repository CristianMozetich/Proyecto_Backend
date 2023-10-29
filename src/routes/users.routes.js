import {Router } from "express"
import { getUser, getUserById, putUserById, deleteUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get('/', getUser)

userRouter.get('/:id', getUserById)

userRouter.put('/:id', putUserById)

userRouter.delete('/:id', deleteUser)

export default userRouter