const mongoose = require("mongoose");

const assigned_project_model = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        required: [true, "project_category are require"],
        ref:"project_category"
    }],
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("assigned_project", assigned_project_model)