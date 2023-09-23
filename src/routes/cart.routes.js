import { Router } from "express";
import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js"

const cartRouter = Router()

cartRouter.get('/:id', async(req,res)=>{
    const {id} = req.params

    try{
        const cart = await cartModel.findById(id)

        if(cart){
            res.status(200).send( {respuesta: 'ok', mensaje: cart} )
        }else{
            res.status(404).send( {respuesta: 'No se encontro el cart mediante id', mensaje: 'Cart Not Found'} )
        }
    } catch(error){
        res.status(400).send({ respuesta: 'error en consultar cart mediante id', mensaje: error })
    }
})

cartRouter.post('/', async (req, res)=>{

    try {
        const cart = await cartModel.create({});
    
        if (cart) {
            res.status(200).send({ respuesta: 'Cart Creado', mensaje: cart });
        } else {
            res.status(404).send({ respuesta: 'Error al crear Cart', mensaje: 'Cart Not Found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al crear Cart', mensaje: error });
    }
    
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);

        if (cart) {
            const prodById = await productModel.findById(pid);

            if (prodById) {
                const cartIndice = cart.products.findIndex(prod => prod.id_prod === pid);

                if (cartIndice !== -1) {
                    cart.products[cartIndice].quantity = quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }

                // Actualiza el carrito utilizando findByIdAndUpdate
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart, { new: true });

                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            } else {
                res.status(404).send({ respuesta: 'No se pudo agregar producto al carrito', mensaje: 'Error al agregar producto al carrito' });
            }
        } else {
            res.status(404).send({ respuesta: 'No se pudo encontrar el carrito', mensaje: 'Carrito no encontrado' });
        }
    } catch (err) {
        res.status(400).send({ respuesta: 'No se pudo crear el carrito', mensaje: err });
    }
});


cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

  
    try {
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ respuesta: 'No se pudo encontrar el carrito', mensaje: 'Carrito no encontrado' });
      }
  
      const prodById = await productModel.findById(pid);
  
      if (!prodById) {
        return res.status(404).json({ respuesta: 'No se pudo encontrar el producto', mensaje: 'Producto no encontrado' });
      }
  
      const cartIndex = cart.products.findIndex((prod) => prod.id_prod === pid);
  
      if (cartIndex !== -1) {
        // Utiliza filter para eliminar el producto del carrito en memoria
        cart.products = cart.products.filter((prod) => prod.id_prod !== pid);
  
        // Actualiza el carrito utilizando findByIdAndUpdate
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart, { new: true });
  
        return res.status(200).json({ respuesta: 'OK', mensaje: respuesta });
      } else {
        return res.status(404).json({ respuesta: 'No se pudo eliminar el producto del carrito', mensaje: 'Producto no encontrado en el carrito' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ respuesta: 'Error interno del servidor', mensaje: err.message });
    }
  });

  cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
  
    try {
      // Busca el carrito por su ID
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ respuesta: 'No se pudo encontrar el carrito', mensaje: 'Carrito no encontrado' });
      }
  
      // Limpia el array de productos del carrito
      cart.products = [];
  
  
      return res.status(200).json({ respuesta: 'OK', mensaje: 'Todos los productos eliminados del carrito con éxito' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ respuesta: 'Error interno del servidor', mensaje: err.message });
    }
  });

export default cartRouter