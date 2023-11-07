import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";

const ticketSchema = new Schema ({
    code:{
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: true,
    },
    purcharser: {
        type: String,
        required: true,
    },
})

ticketSchema.pre("save", function (next) {
    if (!this.code) {
        this.code = randomUUID()
    }
    next()
})

export const ticketModel = model('ticket', ticketSchema)