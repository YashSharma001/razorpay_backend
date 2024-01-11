import mongoose from "mongoose"

//create a schema
const schema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        select: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

// create a model(collection)
export const Payment = mongoose.model("Payment", schema)