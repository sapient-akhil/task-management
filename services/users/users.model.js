const mongoose = require("mongoose");

const usersModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username are require"]
    },
    email: {
        type: String,
        required: [true, "email are require"]
    },
    name: {
        type: String,
        required: [true, "name are require"]
    },
    password: {
        type: String,
        required: [true, "password are require"]
    },
    address: {
        type: String,
        required: [true, "name are require"]
    },
    birthDate: {
        type: Date,
        required: [true, "birthDate are require"]
    },
    joinDate: {
        type: Date,
        required: [true, "joinDate are require"]
    },
    probationDate: {
        type: Date,
        required: [true, "probationDate are require"],
    },
    appraisalDate: {
        type: Date,
        required: [true, "appraisalDate are require"]
    },
    phoneNumber: {
        type: String,
        required: [true, "phoneNumber are require"]
    },
    emergencyContact: {
        type: String,
        required: [true, "emergencyContact are require"]
    },
    aadharCard: {
        type: Number,
        required: [true, "aadharCard are require"],
    },
    panCard: {
        type: String,
        required: [true, "panCard are require"]
    },
    bankName: {
        type: String,
        required: [true, "bankName are require"]
    },
    bankAccountNumber: {
        type: Number,
        required: [true, "bankAccountNumber are require"]
    },
    ifscCode: {
        type: String,
        required: [true, "ifscCode are require"]
    },
    nameAsPerBank: {
        type: String,
        required: [true, "nameAsPerBank are require"]
    },
    pastExperience: {
        type: Number,
        required: [true, "pastExperience are require"]
    },
    experienceWithUS: {
        type: Number
    },
    totalExperience: {
        type: Number
    },
    ctc: {
        type: Number,
    },
    profilePhoto: {
        type: Array,
    },
    designation: {
        type: mongoose.Types.ObjectId,
        ref: "designation"
    },
    user_role: {
        type: mongoose.Types.ObjectId,
        ref: "role"
    },
    technology_skills: [{
        type: mongoose.Types.ObjectId,
        ref: "technologySkills"
    }],
    confirmed: {
        type: String,
        default: "false"
    },
    blocked: {
        type: String,
        default: "false"
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("user", usersModel)