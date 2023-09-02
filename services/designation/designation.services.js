const designationModel = require("./designation.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
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
    findAllDesignation: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await designationModel.find({},projectionFields)
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
    createUpdateDesignation: async (designation, req_data) => {
        return new Promise(async (resolve) => {
            await designationModel.updateOne({ designation }, { ...req_data }, { upsert: true });
            return resolve(
                await designationModel.find(
                    { designation },
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