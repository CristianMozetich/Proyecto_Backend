import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { cartModel } from './cart.models.js'


const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: { 
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    documents: [{
        name: String,
        reference: String
      }],
    last_connection: { // Propiedad para almacenar la última conexión del usuario
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(mongoosePaginate)
//Parametro 1:Nombre coleccion - Parametro 2: Schema 

userSchema.pre('save', async function(next) {
    try{
        const newCart = await cartModel.create({})
        this.cart = newCart._id
        next()
    }catch(error){
        next(error)
    }
})

export const userModel = model('users', userSchema)