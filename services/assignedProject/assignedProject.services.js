const assignedProjectModel = require("./assignedProject.model")
const dailyTaskModel = require("../dailyTask/dailyTask.model")

module.exports = {
    findAllAssignedProject: async (filter, page, pageSize) => {

        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.aggregate(
                    [
                        {
                            $match: { active: true }
                        },
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
                                user: { $first: "$user" },
                                project: { $first: "$project" },
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
                                localField: "project",
                                foreignField: "_id",
                                as: "projectName",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "user",
                                foreignField: "_id",
                                as: "userName",
                            },
                        },
                        {
                            $match: { "userName.active": true }
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
                            $project: {
                                "startDate": 1,
                                "endDate": 1,
                                "assigProject_id": 1,
                                "_id": 1,
                                "data.totalHour": 1,
                                "data.totalMinutes": 1,
                                "projectName.name": 1,
                                "userName.name": 1,
                                "projectName.name": 1,
                                "projectName._id": 1,
                                "userName.name": 1,
                                "userName._id": 1,
                                "projectCategoryName.name": 1,
                                "projectCategoryName._id": 1,
                            }
                        },
                        {
                            $sort: {
                                "userName.name": 1 // Sort users by name in ascending order
                            }
                        },
                        {
                            $group: {
                                _id: { userId: "$_id.user", name: { $arrayElemAt: ["$userName.name", 0] } },
                                assignedProjects: {
                                    $push: {
                                        // projectId: "$_id.projectId",
                                        // name: "$projectName.name", // Include the project name
                                        totalHour: { $arrayElemAt: ["$data.totalHour", 0] }, // Use the renamed fields
                                        totalMinutes: { $arrayElemAt: ["$data.totalMinutes", 0] },
                                        startDate: "$startDate",
                                        endDate: "$endDate",
                                        projectName: { $arrayElemAt: ["$projectName", 0] },
                                        // userName:"$userName",
                                        projectCategoryName: "$projectCategoryName",
                                        assigProject_id: "$assigProject_id",
                                    }
                                },
                                totalHour: {
                                    $sum: { $arrayElemAt: ["$data.totalHour", 0] }
                                },
                                totalMinutes: {
                                    $sum: { $arrayElemAt: ["$data.totalMinutes", 0] }
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
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", id] }, // Existing condition
                                        { $eq: ["$active", true] } // New condition
                                    ]
                                }
                            }
                        },
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
                                localField: "_id.projectId",
                                foreignField: "_id",
                                as: "projectName",
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "user",
                                foreignField: "_id",
                                as: "userName",
                            },
                        },
                        // {
                        //     $match: { "userName.active": true }
                        // },
                        {
                            $lookup: {
                                from: "projectcategories",
                                localField: "project_category",
                                foreignField: "_id",
                                as: "projectCategoryName",
                            },
                        },
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
                                "projectName.name": 1,
                                "projectName._id": 1,
                                "userName.name": 1,
                                "userName._id": 1,
                                "projectCategoryName.name": 1,
                                "projectCategoryName._id": 1,
                            }
                        },
                        {
                            $sort: {
                                "userName.name": 1 // Sort users by name in ascending order
                            }
                        },
                        {
                            $group: {
                                _id: { userId: "$_id.user", name: { $arrayElemAt: ["$userName.name", 0] } },
                                assignedProjects: {
                                    $push: {
                                        // projectId: "$_id.projectId",
                                        // name: "$projectName.name", // Include the project name
                                        totalHour: { $arrayElemAt: ["$data.totalHour", 0] }, // Use the renamed fields
                                        totalMinutes: { $arrayElemAt: ["$data.totalMinutes", 0] },
                                        startDate: "$startDate",
                                        endDate: "$endDate",
                                        projectName: { $arrayElemAt: ["$projectName", 0] },
                                        // userName:"$userName",
                                        projectCategoryName: "$projectCategoryName",
                                        assigProject_id: "$assigProject_id",
                                    }
                                },
                                totalHour: {
                                    $sum: { $arrayElemAt: ["$data.totalHour", 0] }
                                },
                                totalMinutes: {
                                    $sum: { $arrayElemAt: ["$data.totalMinutes", 0] }
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




    // {
    //     "_id" : {
    //         "project" : ObjectId("64f6ab206c206d2cfba319ed")
    //     },
    //     "user" : ObjectId("64f59a6a95246c71d6333f04"),
    //     "project" : ObjectId("64f6ab206c206d2cfba319ed"),
    //     "project_category" : ObjectId("64f69f2f1bf64fb348e2537a"),
    //     "totalHour" : 25.0,
    //     "totalMinutes" : NumberInt(30),
    //     "description" : "done all update routes",
    //     "hours" : NumberInt(8),
    //     "minutes" : NumberInt(30),
    //     "date" : ISODate("2023-09-03T00:00:00.000+0000"),
    //     "userData" : [
    //         {
    //             "_id" : ObjectId("64f59a6a95246c71d6333f04"),
    //             "username" : "abhi",
    //             "email" : "abhisavaliya@sapientcodelabs.com",
    //             "name" : "abhi savaliya",
    //             "password" : "$2b$10$.9J15dcyV2ND/hQmyuvLCul5erik7O3plVVn2w9LpP43VRHMuTPry",
    //             "address" : "punagam,surat",
    //             "birthDate" : ISODate("2002-02-21T00:00:00.000+0000"),
    //             "joinDate" : ISODate("2019-12-22T00:00:00.000+0000"),
    //             "probationDate" : ISODate("2019-11-11T00:00:00.000+0000"),
    //             "appraisalDate" : ISODate("2019-11-10T00:00:00.000+0000"),
    //             "phoneNumber" : 5555555555.0,
    //             "emergencyContact" : 6666666666.0,
    //             "aadharCard" : 789478947894.0,
    //             "panCard" : "ABC789",
    //             "bankName" : "HDFC",
    //             "bankAccountNumber" : 789456789456.0,
    //             "ifscCode" : "AXIS123",
    //             "nameAsPerBank" : "abhi savaliya",
    //             "pastExperience" : NumberInt(2),
    //             "experienceWithUS" : NumberInt(1),
    //             "totalExperience" : NumberInt(5),
    //             "ctc" : NumberInt(1),
    //             "profilePhoto" : [
    //                 "C:\\Users\\Sapient-dev-04\\Desktop\\akhil\\task-management\\uploads\\1693817513112_maxresdefault.jpg"
    //             ],
    //             "designation" : ObjectId("64f30e72dc126f58dec52307"),
    //             "user_role" : ObjectId("64f2ea95dc126f58de96a564"),
    //             "technology_skills" : [
    //                 ObjectId("64f31dac56bcdb9a8c914c36"),
    //                 ObjectId("64f31dbe56bcdb9a8c915fc9")
    //             ],
    //             "confirmed" : "false",
    //             "blocked" : "false",
    //             "active" : false,
    //             "__v" : NumberInt(0),
    //             "createdAt" : ISODate("2023-09-04T08:50:50.683+0000"),
    //             "updatedAt" : ISODate("2023-09-18T03:18:58.623+0000")
    //         }
    //     ],
    //     "projectData" : [
    //         {
    //             "_id" : ObjectId("64f6ab206c206d2cfba319ed"),
    //             "name" : "Evify",
    //             "startDate" : ISODate("2023-02-22T00:00:00.000+0000"),
    //             "description" : "<p>this is a blog site.</p>",
    //             "technology_skills" : [
    //                 "64f31dac56bcdb9a8c914c36",
    //                 "64f31dbe56bcdb9a8c915fc9"
    //             ],
    //             "deployed" : false,
    //             "active" : true,
    //             "__v" : NumberInt(0),
    //             "createdAt" : ISODate("2023-09-05T04:14:24.019+0000"),
    //             "updatedAt" : ISODate("2023-09-16T09:07:47.084+0000")
    //         }
    //     ],
    //     "projectCategoryData" : [
    //         {
    //             "_id" : ObjectId("64f69f2f1bf64fb348e2537a"),
    //             "name" : "Android App",
    //             "active" : true,
    //             "__v" : NumberInt(0),
    //             "createdAt" : ISODate("2023-09-05T03:23:28.003+0000"),
    //             "updatedAt" : ISODate("2023-09-05T03:23:28.003+0000")
    //         }
    //     ]
    // }
    