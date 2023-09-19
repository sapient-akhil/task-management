const dailyTaskModel = require("./dailyTask.model");

module.exports = {
    findAllDailyTask: async (filter, page) => {
        return new Promise(async (resolve) => {

            // console.log("filter", JSON.stringify(filter))
            // console.log("page", page)

            return resolve(
                await dailyTaskModel.aggregate([
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$active", true] }, // Include this line for active: true condition
                                    { $and: filter } // Include your existing filter conditions here
                                ]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "userData",
                        },
                    },
                    {
                        $lookup: {
                            from: "projects",
                            localField: "project",
                            foreignField: "_id",
                            as: "projectData",
                        },
                    },
                    {
                        $lookup: {
                            from: "projectcategories",
                            localField: "project_category",
                            foreignField: "_id",
                            as: "projectCategoryData",
                        },
                    },
                    {
                        $project: {
                            "date": 1,
                            "description": 1,
                            "hours": 1,
                            "minutes": 1,
                            // "totalHour": 1,
                            // "totalMinutes": 1,
                            "projectData": { $arrayElemAt: ["$projectData", 0] },
                            "projectCategoryData": { $arrayElemAt: ["$projectCategoryData", 0] }, // Extract the first element
                            "userData": { $arrayElemAt: ["$userData", 0] }, // Extract the first element
                        }
                    },
                    {
                        $project: {
                            "date": 1,
                            "projectData._id": 1,
                            "projectData.name": 1,
                            "projectCategoryData._id": 1,
                            "projectCategoryData.name": 1,
                            "description": 1,
                            "hours": 1,
                            "minutes": 1,
                            // "totalHour": 1,
                            // "totalMinutes": 1,
                            "userData._id": 1,
                            "userData.name": 1,
                        }
                    },
                ])
                    .sort({ date: -1 })
                    .skip((page.page_no - 1) * page.page_per)
                    .limit(page.page_per * 1)
            )
        });
    },
    findAllDailyTaskForUser: async (id, filter, page) => {
        return new Promise(async (resolve) => {

            // console.log("filter", JSON.stringify(filter))
            // console.log("page", page)

            return resolve(
                await dailyTaskModel.aggregate([
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user", id] }, // Existing condition
                                    { $eq: ["$active", true] },
                                ]
                            }
                        }
                    },
                    { $match: { $expr: { $and: filter } } }, // New condition
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "userData",
                        },
                    },
                    {
                        $lookup: {
                            from: "projects",
                            localField: "project",
                            foreignField: "_id",
                            as: "projectData",
                        },
                    },
                    {
                        $lookup: {
                            from: "projectcategories",
                            localField: "project_category",
                            foreignField: "_id",
                            as: "projectCategoryData",
                        },
                    },
                    {
                        $project: {
                            "date": 1,
                            "description": 1,
                            "hours": 1,
                            "minutes": 1,
                            // "totalHour": 1,
                            // "totalMinutes": 1,
                            "projectData": { $arrayElemAt: ["$projectData", 0] },
                            "projectCategoryData": { $arrayElemAt: ["$projectCategoryData", 0] }, // Extract the first element
                            "userData": { $arrayElemAt: ["$userData", 0] }, // Extract the first element
                        }
                    },
                    {
                        $project: {
                            "date": 1,
                            "projectData._id": 1,
                            "projectData.name": 1,
                            "projectCategoryData._id": 1,
                            "projectCategoryData.name": 1,
                            "description": 1,
                            "hours": 1,
                            "minutes": 1,
                            // "totalHour": 1,
                            // "totalMinutes": 1,
                            "userData._id": 1,
                            "userData.name": 1,
                        }
                    },
                ])
                    .sort({ date: -1 })
                    .skip((page.page_no - 1) * page.page_per)
                    .limit(page.page_per * 1)
            )
        });
    },
    totalTime: async (filter) => {
        return new Promise(async (resolve) => {

            return resolve(
                await dailyTaskModel.aggregate([
                    { $match: { $expr: { $and: filter } } },
                    {
                        $group: {
                            _id: null,
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
                    },
                    {
                        $project: {
                            "_id": 0,
                            "totalHour": { $toString: "$totalHour" },
                            "totalMinutes": { $toString: "$totalMinutes" }
                        }
                    }
                ]))
        })
    },
    totalTimeForUser: async (id, filter) => {
        return new Promise(async (resolve) => {

            return resolve(
                await dailyTaskModel.aggregate([
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user", id] }, // Existing condition
                                    { $eq: ["$active", true] },
                                ]
                            }
                        }
                    },
                    { $match: { $expr: { $and: filter } } },
                    {
                        $group: {
                            _id: null,
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
                    },
                    {
                        $project: {
                            "_id": 0,
                            "totalHour": { $toString: "$totalHour" },
                            "totalMinutes": { $toString: "$totalMinutes" }
                        }
                    }
                ]))
        })
    },
    findByDailyTaskId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await dailyTaskModel.findOne(
                    { _id },
                    { __v: 0 }
                )
                    .populate({
                        path: "project",
                        populate: {
                            path: "technology_skills",
                            model: "technologySkills"
                        }
                    })
                    .populate("user")
                    .populate({
                        path: "user",
                        populate: {
                            path: "technology_skills",
                            model: "technologySkills"
                        }
                    })
                    .populate({
                        path: "user",
                        populate: {
                            path: "user_role",
                            model: "role"
                        }
                    })
                    .populate({
                        path: "user",
                        populate: {
                            path: "designation",
                            model: "designation"
                        }
                    }).populate("project_category")
                    .sort({ createdAt: -1 })
            );
        });
    },
    countDailyTask: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await dailyTaskModel.countDocuments({ active: true })
            )
        });
    },
    findDailyTask: async (dailyTask) => {
        return new Promise(async (resolve) => {
            return resolve(
                await dailyTaskModel.findOne(
                    { dailyTask },
                    { __v: 0 }
                )
            )
        });
    },
    createDailyTask: async (req_data) => {
        return new Promise(async (resolve) => {
            await dailyTaskModel.insertMany({ ...req_data });
            return resolve(
                await dailyTaskModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    updateDailyTask: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await dailyTaskModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await dailyTaskModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteDailyTask: async (_id) => {
        return new Promise(async (resolve) => {
            await dailyTaskModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await dailyTaskModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}









// find_all_dailyTask: async (req_data, page, pageSize) => {
//     try {
//       // Construct the query based on the req_data
//       const query = {};

//       if (req_data.id) {
//         query.user = req_data.id;
//       }

//       if (req_data.startDate && req_data.endDate) {
//         query.date = { $gte: req_data.startDate, $lt: req_data.endDate };
//       }

//       if (req_data.project) {
//         query.project = req_data.project;
//       }

//       if (req_data.project_category) {
//         query.project_category = req_data.project_category;
//       }

//       // You can add more conditions based on the user input

//       const total = await dailyTaskModel.countDocuments(query);
//       const pageCount = Math.ceil(total / pageSize);

//       const dailyTask = await dailyTaskModel
//         .find(query, { __v: 0 })
//         .populate({
//           path: "project",
//           populate: {
//             path: "technology_skills",
//             model: "technology_skills",
//           },
//         })
//         .populate("user")
//         .populate({
//           path: "user",
//           populate: {
//             path: "technology_skills",
//             model: "technology_skills",
//           },
//         })
//         .populate({
//           path: "user",
//           populate: {
//             path: "user_role",
//             model: "role",
//           },
//         })
//         .populate({
//           path: "user",
//           populate: {
//             path: "designation",
//             model: "designation",
//           },
//         })
//         .populate("project_category")
//         .limit(pageSize * 1)
//         .skip((page - 1) * pageSize);

//       return {
//         success: true,
//         message: "All daily tasks fetched successfully.",
//         data: dailyTask,
//         meta: {
//           pagination: {
//             page,
//             pageSize,
//             pageCount,
//             total,
//           },
//         },
//       };
//     } catch (error) {
//       throw error;
//     }
//   },





// db.getCollection("dailytasks").aggregate([{
//     $match: { user: ObjectId("64f59a6a95246c71d6333f04") }
// },
//{
//    $lookup: {
//        from: "users",
//        localField: "user",
//        foreignField: "_id",
//        as: "userData",
//    },
//},
//{
//    $lookup: {
//        from: "projects",
//        localField: "project",
//        foreignField: "_id",
//        as: "projectData",
//    },
//},
//{
//    $lookup: {
//        from: "projectcategories",
//        localField: "project_category",
//        foreignField: "_id",
//        as: "projectCategoryData",
//    },
//},
//{
//    $group: {
//        _id: {
//            project: "$project",
//        },
//        userData: { $first: "$userData" },
//        projectData: { $first: "$projectData" },
//        projectCategoryData: { $first: "$projectCategoryData" },
//        totalHour: { $sum: "$hours" },
//        totalMinutes: { $sum: "$minutes" },
//    },
//},
//{
//    $addFields: {
//        totalHour: {
//            $add: [
//                "$totalHour",
//                {
//                    $floor: {
//                        $divide: ["$totalMinutes", 60]
//                    }
//                }
//            ]
//        },
//        totalMinutes: {
//            $mod: ["$totalMinutes", 60]
//        }
//    }
//},
//{
//                            $project: {
//                                "startDate": 1,
//                                "endDate": 1,
//                                "assigProject_id": 1,
//                                "_id": 1,
//                                "data.totalHour": 1,
//                                "data.totalMinutes": 1,
//                                "projectName.name": 1,
//                                "userName.name": 1,
//                                "projectName.name": 1,
//                                "projectName._id": 1,
//                                "userName.name": 1,
//                                "userName._id": 1,
//                                "projectCategoryName.name": 1,
//                                "projectCategoryName._id": 1,
//                            }
//                        },
// ])
