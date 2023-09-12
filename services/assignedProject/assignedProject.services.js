const assignedProjectModel = require("./assignedProject.model")

module.exports = {
    findAllAssignedProject: async (filter, page, user) => {
        user.active = true
        // console.log("filter", filter)
        // console.log("page", page)
        // console.log("user", user)
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.find(filter)
                    .populate("project"
                        //{
                        //path: "project",
                        // populate: {
                        //     path: "technology_skills",
                        //     model: "technologySkills"
                        // }
                        //  }
                    )
                    .populate({
                        path: "user",
                        populate: [
                            {
                                path: "technology_skills",
                                // select: "technology_skills "
                            },
                            {
                                path: "user_role",
                                // select: "role"
                            },
                            {
                                path: "designation",
                                // select: "designation"
                            }
                        ],
                        select: "_id username email name phoneNumber designation user_role technology_skills active"
                    })
                    .populate("project_category")
                    .limit(page.page_per * 1)
                    .skip((page.page_no - 1) * page.page_per)
                    .sort({ createdAt: -1 })
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
    countAssignedProject: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await assignedProjectModel.countDocuments({ active: true })
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