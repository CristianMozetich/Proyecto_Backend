import { Router } from "express";
import { messagesModel } from "../models/messeges.models.js";

const messagesRouter = Router()

messagesRouter.get('/', async(req,res)=>{
    const messages = await messagesModel.find()

    try{
        if(messages){
            res.status(200).send({ respuesta: 'OK', mensaje: messages })
        }else{
            res.status(404).send({ respuesta: 'No se encontraron los mensajes', mensaje: 'Messages Not Found'})
        }
    } catch (err){
        res.status(500).send({ respuesta: 'Error', mensaje: err})
    }
})

messagesRouter.post('/', async (req,res)=>{
    const { email, messages, postTime } = req.body

    try{
        const message = await messagesModel.create({ email, messages, postTime })

        if(message){
            res.status(200).send({ respuesta: 'Mensaje Creado', mensaje: message })
        } else{
            res.status(404).send({ respuesta: 'No fue posible crear el mensaje', mensaje: 'Mensaje No creado'})
        }
    } catch(err){
        res.status(500).send({ respuesta: 'Fail creating message', mensaje: err})
    }
})


export default messagesRouter