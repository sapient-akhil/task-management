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
        type: mongoose.Types.ObjectId,
        required: [true, "project_category are require"],
        ref: "projectCategory"
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

module.exports = mongoose.model("assignedProject", assignedProjectModel)



// [
//     {
//         $unwind: "$project",
//     },
//     { $match: { $expr: { $and: filter } } },
//     {
//         $group: {
//             _id: {
//                 user: "$user",
//                 projectId: "$project",
//             },
//             startDate: { $first: "$startDate" },
//             endDate: { $first: "$endDate" },
//             totalHours: { $sum: "$project.hours" }, // Calculate total hours
//             totalMinutes: { $sum: "$project.minutes" }, // Calculate total minutes
//         },
//     },
//     {
//         $lookup: {
//             from: "users",
//             localField: "_id.user",
//             foreignField: "_id",
//             as: "userName",
//         },
//     },
//     {
//         $lookup: {
//             from: "projects",
//             localField: "_id.projectId",
//             foreignField: "_id",
//             as: "projectDetails",
//         },
//     },
//     {
//         $unwind: "$projectDetails",
//     },
//     {
//         $project: {
//             "_id": 0,
//             "userId": "$_id.user",
//             "projectId": "$_id.projectId",
//             "name": "$projectDetails.name", // Get the project name
//             "hour": "$totalHours", // Use the renamed fields
//             "minutes": "$totalMinutes", // Use the renamed fields
//         }
//     },
//     {
//         $group: {
//             _id: "$userId",
//             assignedProjects: {
//                 $push: {
//                     projectId: "$projectId",
//                     name: "$name", // Include the project name
//                     hour: "$hour", // Use the renamed fields
//                     minutes: "$minutes", // Use the renamed fields
//                 }
//             },
//         },
//     },
//     {
//         $lookup: {
//             from: "users",
//             localField: "_id",
//             foreignField: "_id",
//             as: "user",
//         },
//     },
//     {
//         $unwind: "$user",
//     },
//     {
//         $project: {
//             "_id": 0,
//             "user": "$user",
//             "assignedProjects": 1,
//         }
//     },
// ]