const mongoose = require("mongoose");

const roleModel = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "role are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("role", roleModel)