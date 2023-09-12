const dailyTaskModel = require("./dailyTask.model")

module.exports = {
    findAllDailyTask: async (filter, page) => {
        return new Promise(async (resolve) => {
            console.log("filter", filter)
            console.log("page", page)

            // const findQuery = {
            // }
            // console.log("findQuery : ", findQuery)
            return resolve(
                await dailyTaskModel.find(filter)
                    // .populate("project")
                    // .populate({
                    //     path: "user",
                    //     populate: [
                    //         {
                    //             path: "technology_skills",
                    //         },
                    //         {
                    //             path: "user_role",
                    //         },
                    //         {
                    //             path: "designation",
                    //         }
                    //     ],
                    //     select: "_id username email name phoneNumber designation user_role technology_skills active"
                    // }).populate("project_category")
                    .limit(page.page_per * 1)
                    .skip((page.page_no - 1) * page.page_per)
                    .sort({ createdAt: -1 })
            )

        });
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