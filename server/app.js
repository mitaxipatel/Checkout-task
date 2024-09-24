const express = require("express");
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const app = express();
const Checkout = require("./models/checkout-model");

mongoose.connect("mongodb+srv://mitaxipatel:mitaxi123@mitaxipatel.g5sxmyh.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/checkout", async (req, res) => {
    try {
        const { name, shippingAddress, cardNumber, cvv, expiryDate, totalAmount } = req.body;

        if (!name || !shippingAddress || !cardNumber || !cvv || !expiryDate || !totalAmount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCheckout = new Checkout({
            name,
            shippingAddress,
            cardNumber,
            cvv,
            expiryDate,
            totalAmount
        });

        await newCheckout.save();

        res.status(201).json({ message: "Checkout completed successfully", checkout: newCheckout });

    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(4000, () => console.log("running at 4000"));