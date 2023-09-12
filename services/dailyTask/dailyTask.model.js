const mongoose = require("mongoose");

const dailyTaskModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, "user are require"],
        ref: "user"
    },
    project: {
        type: mongoose.Types.ObjectId,
        required: [true, "project are require"],
        ref: "project"
    },
    project_category: {
        type: mongoose.Types.ObjectId,
        ref: "projectCategory"
    },
    date: {
        type: Date,
        required: [true, "date are require"]
    },
    hours: {
        type: Number,
        required: [true, "hours are require"],
    },
    minutes: {
        type: Number,
        default: false
    },
    description: {
        type: String,
        required: [true, "description are require"],
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("dailyTask", dailyTaskModel)