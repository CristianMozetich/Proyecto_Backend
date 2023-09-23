import { Schema, model } from "mongoose";
import  paginate  from "mongoose-paginate-v2";


const productSchema = new Schema ({
    title: {
        type: String,
        required: true,
        index: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status : {
        type: Boolean,
        default: true
    },
    code : {
        type: String,
        unique: true
    },
    thumbnails : []
})

productSchema.plugin(paginate)

export const productModel = model('products', productSchema)