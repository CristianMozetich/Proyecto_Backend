import { Router } from "express";
import { userModel } from "../models/user.models.js";

const sessionRouter = Router()

sessionRouter.post('/login', async (req,res)=>{
    const {email, password} = req.body

    try{
        if(req.session.login){
            res.status(200).send({resultado: 'login ya existente'})
        }
        const user = await userModel.findOne({email: email})
        if(user){
            if(user.password == password){
                req.session.login = true
                res.status(200).send({resultado: 'login valido', message: user})
            }else{
                res.status(401).send({resultado: 'contraseña no valida', message: password})
            }
        }else{
            res.status(404).send({resultado: 'user not found', message: user})
        }
    }catch( error ){
        res.status(400).send(`error en Login ${error}`)
    }
})

sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy()
    }

    res.status(200).send({resultado: 'Usuario deslogueado'})
})

export default sessionRouter