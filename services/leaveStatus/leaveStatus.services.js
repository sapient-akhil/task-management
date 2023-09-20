const leaveStatusModel = require("./leaveStatus.model")

module.exports = {
    findAllLeaveStatus: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveStatusModel.find({ active: true }, { __v: 0 }).sort({ createdAt: -1 })
            )
        });
    },
    createLeaveStatus: async (req_data) => {
        return new Promise(async (resolve) => {
            await leaveStatusModel.insertMany({ ...req_data });
            return resolve(
                await leaveStatusModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    findByLeaveStatusId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveStatusModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    findLeaveStatus: async (name) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveStatusModel.findOne(
                    { name },
                    { __v: 0 }
                )
            )
        });
    },
    updateLeaveStatus: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await leaveStatusModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await leaveStatusModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteLeaveStatus: async (_id) => {
        return new Promise(async (resolve) => {
            await leaveStatusModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await leaveStatusModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}