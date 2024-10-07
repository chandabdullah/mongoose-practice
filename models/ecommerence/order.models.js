import mongoose, { mongo } from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: {
        type: [orderItemSchema]
    },
    addresss: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'delivered'],
        default: 'pending'
    }
}, { timestamps: true, });

export const order = mongoose.model('order', orderSchema);
