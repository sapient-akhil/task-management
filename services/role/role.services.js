const roleModel = require("./role.model")
const projectionFields = { __v: 0 }

module.exports = {

    findAllRole: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.find()
            )
        });
    },
    findByRoleId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    findRole: async (role) => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.findOne(
                    { role },
                    projectionFields
                )
            )
        });
    },
    createRole: async (req_data) => {
        return new Promise(async (resolve) => {
            await roleModel.insertMany({ ...req_data });
            return resolve(
                await roleModel.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    updateRole: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await roleModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await roleModel.find(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    deleteRoleData: async (_id) => {
        return new Promise(async (resolve) => {
            await roleModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await roleModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}