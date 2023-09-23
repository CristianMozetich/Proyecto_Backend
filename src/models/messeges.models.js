import { Schema, model } from "mongoose";

const messagesSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    messages: {
        type: String,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now
    }
})

export const messagesModel = model('messages', messagesSchema)