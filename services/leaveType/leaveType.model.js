const mongoose = require("mongoose");

const leaveTypeModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("leaveType", leaveTypeModel)