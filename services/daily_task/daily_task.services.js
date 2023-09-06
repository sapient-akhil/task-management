const daily_task_model = require("./daily_task.model")
const projectionFields = { __v: 0 }

module.exports = {
    find_all_daily_task: async (filter, page) => {
        return new Promise(async (resolve) => {
            console.log("filter", filter)
            console.log("page", page)

            // const findQuery = {
            // }
            // console.log("findQuery : ", findQuery)
            return resolve(
                await daily_task_model.find(filter)
                    .populate({
                        path: "project",
                        populate: {
                            path: "technology_skills",
                            model: "technology_skills"
                        }
                    })
                    .populate("user")
                    .populate({
                        path: "user",
                        populate: {
                            path: "technology_skills",
                            model: "technology_skills"
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
                    .limit(page.page_per * 1)
                    .skip((page.page_no - 1) * page.page_per)
            )

        });
    },
    find_by_daily_task_id: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await daily_task_model.findOne(
                    { _id },
                    projectionFields
                )
                    .populate({
                        path: "project",
                        populate: {
                            path: "technology_skills",
                            model: "technology_skills"
                        }
                    })
                    .populate("user")
                    .populate({
                        path: "user",
                        populate: {
                            path: "technology_skills",
                            model: "technology_skills"
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
            );
        });
    },
    count_daily_task: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await daily_task_model.countDocuments()
            )
        });
    },
    find_daily_task: async (daily_task) => {
        return new Promise(async (resolve) => {
            return resolve(
                await daily_task_model.findOne(
                    { daily_task },
                    projectionFields
                )
            )
        });
    },
    create_daily_task: async (req_data) => {
        return new Promise(async (resolve) => {
            await daily_task_model.insertMany({ ...req_data });
            return resolve(
                await daily_task_model.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    update_daily_task: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await daily_task_model.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await daily_task_model.find(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    delete_daily_task: async (_id) => {
        return new Promise(async (resolve) => {
            await daily_task_model.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await daily_task_model.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}









// find_all_daily_task: async (req_data, page, pageSize) => {
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

//       const total = await daily_task_model.countDocuments(query);
//       const pageCount = Math.ceil(total / pageSize);

//       const daily_task = await daily_task_model
//         .find(query, projectionFields)
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
//         data: daily_task,
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