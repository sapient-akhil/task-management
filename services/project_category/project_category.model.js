const mongoose = require("mongoose");

const project_category_Model = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("project_category", project_category_Model)