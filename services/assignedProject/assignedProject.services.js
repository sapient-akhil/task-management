const assignedProjectModel = require("./assignedProject.model")

module.exports = {
    findAllAssignedProject: async (page, pageSize, user) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.find({ user, active: true })
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
                    })
                    .populate("project_category")
                    .limit(pageSize * 1)
                    .skip((page - 1) * pageSize)
                    .sort({ createdAt: -1 })
            )
        });
    },
    findByAssignedProjectId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.findOne({ _id }, { __v: 0 })
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
                    })
                    .populate("project_category", { __v: 0 })
            )
        });
    },
    countAssignedProject: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.countDocuments()
            )
        });
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