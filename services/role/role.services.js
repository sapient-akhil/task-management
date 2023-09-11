const roleModel = require("./role.model")

module.exports = {
    findRoleId: async (role) => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.findOne(
                    { role },
                    { _id: 1 }
                )
            );
        });
    },
    findAllRole: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.find({ active: true }, { __v: 0 }).sort({ createdAt: -1 })
            )
        });
    },
    findByRoleId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    findRole: async (role) => {
        return new Promise(async (resolve) => {
            return resolve(
                await roleModel.findOne(
                    { role },
                    { __v: 0 }
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
                    { __v: 0 }
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
                    { __v: 0 }
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
                    { __v: 0 }
                )
            );
        });
    }
}