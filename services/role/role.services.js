const roleModel = require("./role.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
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
    createUpdateRole: async (role, req_data) => {
        return new Promise(async (resolve) => {
            await roleModel.updateOne({ role }, { ...req_data }, { upsert: true });
            return resolve(
                await roleModel.find(
                    { role },
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