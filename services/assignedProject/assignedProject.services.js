const assignedProjectModel = require("./assignedProject.model")
const dailyTaskModel = require("../dailyTask/dailyTask.model")

module.exports = {
    findAllAssignedProject: async (filter, page, pageSize) => {

        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.aggregate(
                    [
                        {
                            $unwind: "$project",
                        },
                        { $match: { $expr: { $and: filter } } },
                        {
                            $group: {
                                _id: {
                                    projectId: "$project",
                                    user: "$user"
                                },
                                startDate: { $first: "$startDate" },
                                endDate: { $first: "$endDate" },
                                project_category: { $first: "$project_category" },
                                assigProject_id: { $first: "$_id" },
                            },
                        },
                        { $match: { $expr: { $and: "$_id.user" } } },
                        {
                            $lookup: {
                                from: "dailytasks",
                                let: {
                                    projectId: "$_id.projectId",
                                    userId: "$_id.user",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$project", "$$projectId"] },
                                                    { $eq: ["$user", "$$userId"] },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        $group: {
                                            _id: {
                                                project: "$project",
                                                user: "$user",
                                            },
                                            totalHour: { $sum: "$hours" },
                                            totalMinutes: { $sum: "$minutes" },
                                        },
                                    },
                                    {
                                        $addFields: {
                                            totalHour: {
                                                $add: [
                                                    "$totalHour",
                                                    {
                                                        $floor: {
                                                            $divide: ["$totalMinutes", 60]
                                                        }
                                                    }
                                                ]
                                            },
                                            totalMinutes: {
                                                $mod: ["$totalMinutes", 60]
                                            }
                                        }
                                    }
                                ],
                                as: "data",
                            },
                        },
                        {
                            $lookup: {
                                from: "projects",
                                localField: "data._id.project",
                                foreignField: "_id",
                                as: "projectName",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "data._id.user",
                                foreignField: "_id",
                                as: "userName",
                            },
                        },
                        {
                            $lookup: {
                                from: "projectcategories",
                                localField: "project_category",
                                foreignField: "_id",
                                as: "projectCategoryName",
                            },
                        },
                        {
                            $unwind: "$data",
                        },
                        {
                            $unwind: "$projectName",
                        },
                        {
                            $unwind: "$userName",
                        },
                        // {
                        //     $unwind: "$projectCategoryName",
                        // },
                        {
                            $project: {
                                "startDate": 1,
                                "endDate": 1,
                                "assigProject_id": 1,
                                "_id": 1,
                                "data.totalHour": 1,
                                "data.totalMinutes": 1,
                                "projectName.name": 1,
                                "userName.name": 1,
                                "projectCategoryName.name": 1,
                                "projectCategoryName._id": 1,
                                // "projectCategoryName.name": 1,
                                // "projectCategoryName._id": 1
                                // "project_category": 1

                            }
                        },
                        {
                            $sort: {
                                "userName.name": 1 // Sort users by name in ascending order
                            }
                        },
                        {
                            $group: {
                                _id: { userId: "$_id.user", name: "$userName.name" },
                                assignedProjects: {
                                    $push: {
                                        projectId: "$_id.projectId",
                                        name: "$projectName.name", // Include the project name
                                        totalHour: "$data.totalHour", // Use the renamed fields
                                        totalMinutes: "$data.totalMinutes",
                                        startDate: "$startDate",
                                        endDate: "$endDate",
                                        projectCategoryName: "$projectCategoryName",
                                        assigProject_id: "$assigProject_id",
                                        // project_category_id: "$projectCategoryName._id",
                                        // project_category: "$project_category", // Include the project name
                                    }
                                },
                                totalHour: {
                                    $sum: "$data.totalHour"
                                },
                                totalMinutes: {
                                    $sum: "$data.totalMinutes"
                                },
                            }
                        },
                        {
                            $addFields: {
                                totalHour: {
                                    $add: [
                                        "$totalHour",
                                        {
                                            $floor: {
                                                $divide: ["$totalMinutes", 60]
                                            }
                                        }
                                    ]
                                },
                                totalMinutes: {
                                    $mod: ["$totalMinutes", 60]
                                }
                            }
                        },
                        {
                            $sort: {
                                "_id.name": 1,
                                "assignedProjects.name": 1
                            }
                        },
                        // {
                        //     $sort: {
                        //         "assignedProjects.project_category": 1
                        //     }
                        // },
                    ])
                    // .sort({ user: 1 })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize * 1)
            )
        });
    },
    findAllAssignedProjectForUser: async (id, page, pageSize) => {

        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.aggregate(
                    [
                        { $match: { $expr: { $eq: ["$user", id] } } },
                        {
                            $unwind: "$project",
                        },
                        {
                            $group: {
                                _id: {
                                    projectId: "$project",
                                    user: "$user",
                                },
                                startDate: { $first: "$startDate" },
                                endDate: { $first: "$endDate" },
                                project_category: { $first: "$project_category" },
                            },
                        },
                        { $match: { $expr: { $and: "$_id.user" } } },
                        {
                            $lookup: {
                                from: "dailytasks",
                                let: {
                                    projectId: "$_id.projectId",
                                    userId: "$_id.user",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$project", "$$projectId"] },
                                                    { $eq: ["$user", "$$userId"] },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        $group: {
                                            _id: {
                                                project: "$project",
                                                user: "$user",
                                            },
                                            totalHour: { $sum: "$hours" },
                                            totalMinutes: { $sum: "$minutes" },
                                        },
                                    },
                                    {
                                        $addFields: {
                                            totalHour: {
                                                $add: [
                                                    "$totalHour",
                                                    {
                                                        $floor: {
                                                            $divide: ["$totalMinutes", 60]
                                                        }
                                                    }
                                                ]
                                            },
                                            totalMinutes: {
                                                $mod: ["$totalMinutes", 60]
                                            }
                                        }
                                    }
                                ],
                                as: "data",
                            },
                        },
                        {
                            $lookup: {
                                from: "projects",
                                localField: "data._id.project",
                                foreignField: "_id",
                                as: "projectName",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "data._id.user",
                                foreignField: "_id",
                                as: "userName",
                            },
                        },
                        {
                            $lookup: {
                                from: "projectcategories",
                                localField: "project_category",
                                foreignField: "_id",
                                as: "projectCategoryName",
                            },
                        },
                        {
                            $unwind: "$data",
                        },
                        {
                            $unwind: "$projectName",
                        },
                        {
                            $unwind: "$userName",
                        },
                        {
                            $unwind: "$projectCategoryName",
                        },
                        {
                            $project: {
                                "startDate": 1,
                                "endDate": 1,
                                "data.totalHour": 1,
                                "data.totalMinutes": 1,
                                "projectName.name": 1,
                                "userName.name": 1,
                                "projectCategoryName.name": 1,
                                "projectCategoryName._id": 1
                            }
                        },
                        {
                            $group: {
                                _id: { userId: "$_id.user", name: "$userName.name" },
                                assignedProjects: {
                                    $push: {
                                        projectId: "$_id.projectId",
                                        name: "$projectName.name", // Include the project name
                                        totalHour: "$data.totalHour", // Use the renamed fields
                                        totalMinutes: "$data.totalMinutes",
                                        startDate: "$startDate",
                                        endDate: "$endDate",
                                        project_category_id: "$projectCategoryName._id",
                                        project_category: "$projectCategoryName.name", // Include the project name
                                    }
                                },
                            }
                        }
                    ])
                    .sort({ user: -1 })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize * 1)
            )
        });
    },
    findByAssignedProjectId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.findOne({ _id }, { __v: 0 })
                    .populate("project")
                    .populate({
                        path: "user",
                        populate: [
                            {
                                path: "technology_skills",
                            },
                            {
                                path: "user_role",
                            },
                            {
                                path: "designation",
                            }
                        ],
                        select: "_id username email name phoneNumber designation user_role technology_skills active"
                    })
                    .populate("project_category", { __v: 0 })
            )
        });
    },
    findByAssignedProjectId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.findOne({ _id }, { __v: 0 })
                    .populate("project")
                    .populate({
                        path: "user",
                        populate: [
                            {
                                path: "technology_skills",
                            },
                            {
                                path: "user_role",
                            },
                            {
                                path: "designation",
                            }
                        ],
                        select: "_id username email name phoneNumber designation user_role technology_skills active"
                    })
                    .populate("project_category", { __v: 0 })
            )
        });
    },
    countAssignedProject: async (filter) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.countDocuments(filter)
            )
        });
    },
    totalTime: async (project, user) => {
        try {
            const tasks = await dailyTaskModel.countDocuments({ project, user });
            return tasks;
        } catch (error) {
            throw error;
        }
    },
    createAssignedProject: async (req_data) => {
        return new Promise(async (resolve) => {
            await assignedProjectModel.insertMany({ ...req_data });
            return resolve(
                await assignedProjectModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    updateAssignedProject: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await assignedProjectModel.findByIdAndUpdate({ _id }, { ...req_data }, { new: true });
            return resolve(
                await assignedProjectModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteAssignedProject: async (_id) => {
        return new Promise(async (resolve) => {
            await assignedProjectModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await assignedProjectModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}


// findAllAssignedProject: async (filter, page, pageSize) => {
//     return new Promise(async (resolve) => {
//         return resolve(
//             await assignedProjectModel.aggregate([
//                 {
//                     $unwind: "$project",
//                 },
//                 { $match: { $expr: { $and: filter } } },
//                 {
//                     $group: {
//                         _id: {
//                             projectId: "$project",
//                             user: "$user"
//                         },
//                         startDate: { $first: "$startDate" },
//                         endDate: { $first: "$endDate" },
//                         assigProject_id: { $first: "$_id" },
//                         projectCategories: { $addToSet: "$project_category" } // Collect all project categories in an array
//                     },
//                 },
//                 { $match: { $expr: { $and: "$_id.user" } } },
//                 {
//                     $lookup: {
//                         from: "dailytasks",
//                         let: {
//                             projectId: "$_id.projectId",
//                             userId: "$_id.user",
//                         },
//                         pipeline: [
//                             {
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ["$project", "$$projectId"] },
//                                             { $eq: ["$user", "$$userId"] },
//                                         ],
//                                     },
//                                 },
//                             },
//                             {
//                                 $group: {
//                                     _id: {
//                                         project: "$project",
//                                         user: "$user",
//                                     },
//                                     totalHour: { $sum: "$hours" },
//                                     totalMinutes: { $sum: "$minutes" },
//                                 },
//                             },
//                             {
//                                 $addFields: {
//                                     totalHour: {
//                                         $add: [
//                                             "$totalHour",
//                                             {
//                                                 $floor: {
//                                                     $divide: ["$totalMinutes", 60]
//                                                 }
//                                             }
//                                         ]
//                                     },
//                                     totalMinutes: {
//                                         $mod: ["$totalMinutes", 60]
//                                     }
//                                 }
//                             }
//                         ],
//                         as: "data",
//                     },
//                 },
//                 {
//                     $lookup: {
//                         from: "projects",
//                         localField: "data._id.project",
//                         foreignField: "_id",
//                         as: "projectName",
//                     },
//                 },
//                 {
//                     $lookup: {
//                         from: "users",
//                         localField: "data._id.user",
//                         foreignField: "_id",
//                         as: "userName",
//                     },
//                 },
//                 {
//                     $unwind: "$data",
//                 },
//                 {
//                     $unwind: "$projectName",
//                 },
//                 {
//                     $unwind: "$userName",
//                 },
//                 {
//                     $project: {
//                         "startDate": 1,
//                         "endDate": 1,
//                         "assigProject_id": 1,
//                         "_id": 1,
//                         "data.totalHour": 1,
//                         "data.totalMinutes": 1,
//                         "projectName.name": 1,
//                         "userName.name": 1,
//                         "projectCategories": 1, // Include the projectCategories field
//                     }
//                 },
//                 {
//                     $sort: {
//                         "userName.name": 1 // Sort users by name in ascending order
//                     }
//                 },
//                 {
//                     $group: {
//                         _id: { userId: "$_id.user", name: "$userName.name" },
//                         assignedProjects: {
//                             $push: {
//                                 projectId: "$_id.projectId",
//                                 name: "$projectName.name",
//                                 totalHour: "$data.totalHour",
//                                 totalMinutes: "$data.totalMinutes",
//                                 startDate: "$startDate",
//                                 endDate: "$endDate",
//                                 assigProject_id: "$assigProject_id",
//                                 projectCategories: "$projectCategories", // Include the projectCategories field
//                             }
//                         },
//                         totalHour: {
//                             $sum: "$data.totalHour"
//                         },
//                         totalMinutes: {
//                             $sum: "$data.totalMinutes"
//                         },
//                     }
//                 },
//                 {
//                     $addFields: {
//                         totalHour: {
//                             $add: [
//                                 "$totalHour",
//                                 {
//                                     $floor: {
//                                         $divide: ["$totalMinutes", 60]
//                                     }
//                                 }
//                             ]
//                         },
//                         totalMinutes: {
//                             $mod: ["$totalMinutes", 60]
//                         }
//                     }
//                 },
//                 {
//                     $sort: {
//                         "_id.name": 1,
//                         "assignedProjects.name": 1,
//                         "assignedProjects.name": 1,
//                     }
//                 },
//             ])
//             // .sort({ user: 1 })
//             .skip((page - 1) * pageSize)
//             .limit(pageSize * 1)
//         )
//     });
// },