import { instance } from "../app.js"
import crypto from "crypto"
import { Payment } from '../models/paymentModel.js'

export const checkout = async (req, res) => {
    // The order_id received in the response should be passed to the checkout. This ties the Order with the payment and secures the request from being tampered

    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",

    };

    const order = await instance.orders.create(options,);

    res.status(200).json({
        success: true,
        order
    })
}

export const paymentVerification = async (req, res) => {


    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthenticated = expectedSignature === razorpay_signature;

    if (isAuthenticated) {
        //save details in database
        await Payment.create({
            razorpay_order_id, razorpay_payment_id, razorpay_signature
        })

        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)

    } else {
        res.status(400).json({
            success: false,
        })
    }

}
