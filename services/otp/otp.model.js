const mongoose = require("mongoose");

const otpModel = new mongoose.Schema({
    otp: {
        type: Number,
        required: [true, "otp are require"]
    },
    email: {
        type: String,
        required: [true, "email are require"]
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("otp", otpModel)