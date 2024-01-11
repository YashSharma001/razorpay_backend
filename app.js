import express, { urlencoded } from "express";
import { config } from "dotenv"
import Razorpay from 'razorpay'
import paymentRouter from "./routes/paymentRoute.js";
import cors from "cors"
import { connectDB } from "./config/data.js";

const app = express();


config({
    path: "./config/config.env"
})

connectDB();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", paymentRouter)

app.get("/api/getkey",(req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is working on ${process.env.PORT}`)
})