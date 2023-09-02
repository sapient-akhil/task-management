const mongoose = require("mongoose");

const technology_skills_Model = new mongoose.Schema({
    technology_skills: {
        type: String,
        required: [true, "role are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("technology_skills", technology_skills_Model)