const leaveStatusModel = require("./leaveStatus.model")
const projectionFields = { __v: 0 }

module.exports = {
    findAllLeaveStatus: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveStatusModel.find({}, projectionFields)
            )
        });
    },
    findByLeaveStatusId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveStatusModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    findLeaveStatus: async (name) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveStatusModel.findOne(
                    { name },
                    projectionFields
                )
            )
        });
    },
    createLeaveStatus: async (req_data) => {
        return new Promise(async (resolve) => {
            await leaveStatusModel.insertMany({ ...req_data });
            return resolve(
                await leaveStatusModel.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    updateLeaveStatus: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await leaveStatusModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await leaveStatusModel.find(
                    { _id },
                    projectionFields
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
                    projectionFields
                )
            );
        });
    }
}