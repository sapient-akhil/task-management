const mongoose = require("mongoose");

const leaveStatusModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name are require"],
        default:"pending"
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("leave status", leaveStatusModel)