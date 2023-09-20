const mongoose = require("mongoose");

const technologySkillsModel = new mongoose.Schema({
    technology_skills: {
        type: String,
        required: [true, "technology-skills are required"]
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("technologySkills", technologySkillsModel)