const leaveModel = require("./leave.model")

module.exports = {
    findAllLeave: async (filter, page) => {
        return new Promise(async (resolve) => {
            // console.log("filter", filter)
            // console.log("page", page)

            return resolve(
                await leaveModel.find(filter)
                    .populate("leaveType", { __v: 0 })
                    .populate("leaveStatus", { __v: 0 })
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
                    .limit(page.page_per * 1)
                    .skip((page.page_no - 1) * page.page_per)
                    .sort({ createdAt: -1 })
            )
        });
    },
    findByLeaveId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveModel.findOne({ _id }, { __v: 0 })
                    .populate("leaveType", { __v: 0 })
                    .populate("leaveStatus", { __v: 0 })
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
            );
        });
    },
    countLeave: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveModel.countDocuments()
            )
        });
    },
    createLeave: async (req_data) => {
        return new Promise(async (resolve) => {
            await leaveModel.insertMany({ ...req_data });
            return resolve(
                await leaveModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    updateLeave: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await leaveModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await leaveModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteLeave: async (_id) => {
        return new Promise(async (resolve) => {
            await leaveModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await leaveModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}