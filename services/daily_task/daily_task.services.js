const daily_task_model = require("./daily_task.model")
const projectionFields = { __v: 0 }

module.exports = {
    find_all_daily_task: async (page, pageSize) => {
        return new Promise(async (resolve) => {
            return resolve(
                await daily_task_model.find({}, projectionFields)
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
                    .limit(pageSize * 1)
                    .skip((page - 1) * pageSize)
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