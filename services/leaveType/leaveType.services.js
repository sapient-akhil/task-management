const leaveTypeModel = require("./leaveType.model")

module.exports = {
    findAllLeaveType: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveTypeModel.find({ active: true }, { __v: 0 }).sort({ createdAt: -1 })
            )
        });
    },
    createLeaveType: async (req_data) => {
        return new Promise(async (resolve) => {
            await leaveTypeModel.insertMany({ ...req_data });
            return resolve(
                await leaveTypeModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    findByLeaveTypeId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveTypeModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    findLeaveType: async (name) => {
        return new Promise(async (resolve) => {
            return resolve(
                await leaveTypeModel.findOne(
                    { name },
                    { __v: 0 }
                )
            )
        });
    },
    updateLeaveType: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await leaveTypeModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await leaveTypeModel.find(
                    { _id },
                    { __v: 0 }
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
                    { __v: 0 }
                )
            );
        });
    }
}