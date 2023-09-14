const assignedProjectModel = require("./assignedProject.model")
const dailyTaskModel = require("../dailyTask/dailyTask.model")

module.exports = {
    // findAllAssignedProject: async (filter, page, user) => {
    //     user.active = true
    //     // console.log("filter", filter)
    //     // console.log("page", page)
    //     // console.log("user", user)
    //     return new Promise(async (resolve) => {
    //         return resolve(
    //             await assignedProjectModel.aggregate(filter)
    //                 // .populate("project")
    //                 // //{
    //                 // //path: "project",
    //                 // // populate: {
    //                 // //     path: "technology_skills",
    //                 // //     model: "technologySkills"
    //                 // // }
    //                 // //  }
    //                 // .populate({
    //                 //     path: "user",
    //                 //     populate: [
    //                 //         {
    //                 //             path: "technology_skills",
    //                 //             // select: "technology_skills "
    //                 //         },
    //                 //         {
    //                 //             path: "user_role",
    //                 //             // select: "role"
    //                 //         },
    //                 //         {
    //                 //             path: "designation",
    //                 //             // select: "designation"
    //                 //         }
    //                 //     ],
    //                 //     select: "_id username email name phoneNumber designation user_role technology_skills active"
    //                 // })
    //                 // .populate("project_category")
    //                 .sort({ startDate: -1 })
    //                 .skip((page.page_no - 1) * page.page_per)
    //                 .limit(page.page_per * 1)
    //         )
    //     });
    // },
    // findByAssignedProjectId: async (_id) => {
    //     return new Promise(async (resolve) => {
    //         return resolve(
    //             await assignedProjectModel.findOne({ _id }, { __v: 0 })
    //                 .populate("project")
    //                 .populate({
    //                     path: "user",
    //                     populate: [
    //                         {
    //                             path: "technology_skills",
    //                         },
    //                         {
    //                             path: "user_role",
    //                         },
    //                         {
    //                             path: "designation",
    //                         }
    //                     ],
    //                     select: "_id username email name phoneNumber designation user_role technology_skills active"
    //                 })
    //                 .populate("project_category", { __v: 0 })
    //         )
    //     });
    // },
    findAllAssignedProject: async (filter) => {
        // user.active = true
        // console.log("user", user)
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
                                    user: "$user",
                                },
                                startDate: { $first: "$startDate" },
                                endDate: { $first: "$endDate" },
                            },
                        },
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
                                                    "$totalHour", // Existing total hours
                                                    {
                                                        $floor: {
                                                            $divide: ["$totalMinutes", 60] // Convert total minutes to hours
                                                        }
                                                    }
                                                ]
                                            },
                                            totalMinutes: {
                                                $mod: ["$totalMinutes", 60] // Calculate remaining minutes
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
                    ])
                    .sort({ startDate: -1 })
                    // .skip((page.page_no - 1) * page.page_per)
                    // .limit(page.page_per * 1)
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