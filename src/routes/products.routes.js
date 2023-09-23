import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router()

productRouter.get('/', async (req,res)=>{
    //const {limit} = req.query
    


    try{
        //const prods = await productModel.find().limit(limit)

        const prodPaginate = await productModel.paginate( { page: 1, sort: '' }, { query: '123', limit: 2 } )


        res.status(200).send({respuesta: 'ok', mensaje: prodPaginate})
        console.log(prodPaginate)
    } catch(error){
        res.status(400).send({ respuesta: 'error en consultar produtos', mensaje: error })
    }
})

productRouter.get('/:id', async (req,res)=>{
    const {id} = req.params

    try{
        const prods = await productModel.findById(id)
        if(prods){
            res.status(200).send({respuesta: 'ok', mensaje: prods})
        } else{
            res.status(404).send({respuesta: 'No se encontro el producto mediante ID', mensaje: 'Not Found'})
        }

    } catch(error){
        res.status(400).send({ respuesta: 'error en consultar produtos', mensaje: error })
    }
})

productRouter.put('/:id', async (req,res)=>{
    const {id} = req.params
    const {title, description, stock, status, code, price, category} = req.body

    try{
        const prods = await productModel.findByIdAndUpdate(id, {title, description, stock, status, code, price, category})
        if(prods){
            res.status(200).send({respuesta: 'ok', mensaje: 'producto actualizado'})
        } else{
            res.status(404).send({respuesta: 'Error en actualizar producto', mensaje: 'Not Found'})
        }

    } catch(error){
        res.status(400).send({ respuesta: 'error en consultar produtos', mensaje: error })
    }
})

productRouter.delete('/:id', async (req,res)=>{
    const {id} = req.params


    try{
        const prods = await productModel.findByIdAndDelete(id)
        if(prods){
            res.status(200).send({respuesta: 'ok', mensaje: 'producto eliminado'})
        } else{
            res.status(404).send({respuesta: 'Error en eliminar producto', mensaje: 'Not Found'})
        }

    } catch(error){
        res.status(400).send({ respuesta: 'error en consultar produtos', mensaje: error })
    }
})

productRouter.post('/', async (req,res)=>{
    const {title, description, stock, code, price, category} = req.body


    try{
        const prod = await productModel.create({ title, description, stock, code, price, category })
        if(prod){
            res.status(200).send({respuesta: 'ok', mensaje: prod})
        } else{
            res.status(404).send({respuesta: 'Error en crear producto', mensaje: 'Error'})
        }

    } catch(error){
        res.status(400).send({ respuesta: 'error en crear producto', mensaje: error })
    }
})


export default productRouter