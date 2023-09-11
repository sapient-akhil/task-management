const mongoose = require("mongoose");

const leaveModel = new mongoose.Schema({
    totalLeave: {
        type: Number,
        required: [true, "totalLeave are require"]
    },
    reason: {
        type: String,
        required: [true, "reason are require"]
    },
    fromDate: {
        type: Date,
        required: [true, "fromDate are require"]
    },
    toDate: {
        type: Date,
        required: [true, "toDate are require"],
    },
    leaveType: {
        type: mongoose.Types.ObjectId,
        required: [true, "leaveType are require"],
        ref: "leaveType"
    },
    leaveStatus: {
        type: mongoose.Types.ObjectId,
        required: [true, "leaveStatus are require"],
        ref: "leaveStatus"
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, "user are require"],
        ref: "user"
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("leave", leaveModel)