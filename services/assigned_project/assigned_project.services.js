const assigned_project_model = require("./assigned_project.model")
const projectionFields = { __v: 0 }

module.exports = {
    find_all_assigned_project: async (page, pageSize, user) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assigned_project_model.find({ user: { $eq: user } }, projectionFields)
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
                    })
                    .populate("project_category", projectionFields)
                    .limit(pageSize * 1)
                    .skip((page - 1) * pageSize)
            )
        });
    },
    find_by_assigned_project_id: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assigned_project_model.findOne({ _id }, projectionFields)
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
                    })
                    .populate("project_category", projectionFields)
            )
        });
    },
    count_assigned_project: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await assigned_project_model.countDocuments()
            )
        });
    },
    create_assigned_project: async (req_data) => {
        return new Promise(async (resolve) => {
            await assigned_project_model.insertMany({ ...req_data });
            return resolve(
                await assigned_project_model.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    update_assigned_project: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await assigned_project_model.findByIdAndUpdate({ _id }, { ...req_data }, { new: true });
            return resolve(
                await assigned_project_model.find(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    delete_assigned_project: async (_id) => {
        return new Promise(async (resolve) => {
            await assigned_project_model.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await assigned_project_model.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}