const mongoose = require("mongoose");

const assignedProjectModel = new mongoose.Schema({
    project: [{
        type: mongoose.Types.ObjectId,
        required: [true, "project are require"],
        ref: "project"
    }],
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, "user are require"],
        ref: "user"
    },
    project_category: [{
        type:  mongoose.Types.ObjectId,
        // required: [true, "project_category are require"],
        ref: "projectCategory"
    }],
    // startDate: {
    //     type: Date
    // },
    // endDate: {
    //     type: Date
    // },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("assignedProject", assignedProjectModel)