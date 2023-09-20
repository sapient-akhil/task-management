const mongoose = require("mongoose");

const designationModel = new mongoose.Schema({
    designation: {
        type: String,
        required: [true, "designation are require"]
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("designation", designationModel)