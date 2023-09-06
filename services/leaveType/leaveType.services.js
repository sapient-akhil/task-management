const leaveTypeModel = require("./leaveType.model")
const projectionFields = { __v: 0 }

module.exports = {
    findAllLeaveType: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveTypeModel.find({}, projectionFields)
            )
        });
    },
    findByLeaveTypeId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveTypeModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    findLeaveType: async (name) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveTypeModel.findOne(
                    { name },
                    projectionFields
                )
            )
        });
    },
    createLeaveType: async (req_data) => {
        return new Promise(async (resolve) => {
            await leaveTypeModel.insertMany({ ...req_data });
            return resolve(
                await leaveTypeModel.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    updateLeaveType: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await leaveTypeModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await leaveTypeModel.find(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    deleteLeaveType: async (_id) => {
        return new Promise(async (resolve) => {
            await leaveTypeModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await leaveTypeModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}