const mongoose = require("mongoose");

const projectModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name are require"]
    },
    startDate: {
        type: Date,
        required: [true, "startDate are require"]
    },
    description: {
        type: String,
        required: [true, "description are require"]
    },
    technology_skills: [{
        type: mongoose.Types.ObjectId,
        required: [true, "technology_skills are require"],
        ref: "technologySkills"
    }],
    deployed: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("project", projectModel)