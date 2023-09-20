const mongoose = require("mongoose");

const quickLinksModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name are required"],
    },
    link: {
        type: String,
        required: [true, "link are required"],
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("quickLinks", quickLinksModel)