const designationModel = require("./designation.model")

module.exports = {
    findAllDesignation: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.find({ active: true }, { __v: 0 }).sort({ createdAt: -1 })
            )
        });
    },
    findByDesignationId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    findDesignation: async (designation) => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.findOne(
                    { designation },
                    { __v: 0 }
                )
            )
        });
    },
    createDesignationData: async (req_data) => {
        return new Promise(async (resolve) => {
            await designationModel.insertMany({ ...req_data });
            return resolve(
                await designationModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    updateDesignation: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await designationModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await designationModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteDesignationData: async (_id) => {
        return new Promise(async (resolve) => {
            await designationModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await designationModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}