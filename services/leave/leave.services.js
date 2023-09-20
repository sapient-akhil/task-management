const leaveModel = require("./leave.model")

module.exports = {
    findAllLeave: async (filter, page) => {
        return new Promise(async (resolve) => {
            // console.log("filter", filter)
            // console.log("user", user)

            return resolve(
                await leaveModel.find(filter)
                    .populate("leaveType", { __v: 0 })
                    // .populate("leaveStatus", { __v: 0 })
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
                    .sort({ fromDate: -1 })
                    .skip((page.page_no - 1) * page.page_per)
                    .limit(page.page_per * 1)
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
    findByLeaveId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveModel.findOne({ _id }, { __v: 0 })
                    .populate("leaveType", { __v: 0 })
                    // .populate("leaveStatus", { __v: 0 })
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
    countLeave: async (filter) => {
        return new Promise(async (resolve) => {
            // console.log("countLeave", filter)
            return resolve(
                await leaveModel.countDocuments(filter)
            )
        });
    },
    // addManycreateLeave: async (req_data) => {
    //     return new Promise(async (resolve) => {
    //         await leaveModel.insertMany(req_data);
    //         return resolve(
    //             await leaveModel.find(
    //                 {},
    //                 { __v: 0 }
    //             )
    //         );
    //     });
    // },
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


