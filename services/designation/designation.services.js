const designationModel = require("./designation.model")
const projectionFields = { __v: 0 }

module.exports = {
    findAllDesignation: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.find()
            )
        });
    },
    findByDesignationId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    findDesignation: async (designation) => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.findOne(
                    { designation },
                    projectionFields
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
                    projectionFields
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
                    projectionFields
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
                    projectionFields
                )
            );
        });
    }
}