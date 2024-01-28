import { cartModel } from "../models/cart.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { productModel } from "../models/products.models.js";
import 'dotenv/config'
import Stripe from "stripe"

//STRIPE
const stripeSecretKey = process.env.STRIPE


//PurchaseCart NO FUNCIONA CORRECTAMENTE
export const purchaseCart = async (req, res) => {
    const {cid} = req.params

    try{
        const cart = await cartModel.findById(cid)
        const purchasedProducts = [];
        const purchaseFail = [];

        if(!cart){
            return res.status(404).send({ respuesta: 'No se logro encontrar el id', mensaje: 'Error' })
        }

            for(const item of cart.products){
                const products = await productModel.findById(item.id_prod);

                if(!products){
                    purchaseFail.push(item.id_prod);
                    continue;
                }

            if( products && products.stock >= item.quantity ){
            products.stock -= item.quantity;
            await products.save()
            purchasedProducts.push(item);
            }else{
                purchaseFail.push(item.id_prod)
            }  
        }

        if(purchasedProducts.length > 0){
            const totalAmount = purchasedProducts.reduce((total, item)=> {
                const product = cart.products.find(p => p.id_prod.equals(item.id_prod));
                return total + product.quantity * product.id_prod.price;
            }, 0)
            

            const ticket = await ticketModel.create({
                code: req.user._id,
                amount: totalAmount,
                purchaser: req.user.email
            })
    
            cart.products= cart.products.filter(item => !purchasedProducts.includes(item));
            await cart.save();

            return res.status(200).send({respuesta: 'Ticket generado exitosamente', mensaje: ticket})
        }else {

            return res.status(404).send({respuesta: 'Error al generar ticket', mensaje: 'Error'})
        }

    }catch(error){
        console.error(error)
        res.status(500).send({error: 'Error al finalizar compra'})
    }
}

export const checkout = async (req, res) => {

    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
      })

    const { id, amount, description } = req.body

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'EUR',
            description: description,
            payment_method: id,
            confirm: true
        })

        console.log(payment)

        res.send({ message: 'Successful payment' })

    } catch(error){
        console.error('Error processing payment:', error);
        res.send({ message: 'No se pudo realizar el pago' })
    }
}
