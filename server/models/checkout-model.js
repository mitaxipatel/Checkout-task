const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Checkout", checkoutSchema);
