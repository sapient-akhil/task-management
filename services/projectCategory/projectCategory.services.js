const projectCategoryModel = require("./projectCategory.model")

module.exports = {
    findAllProjectCategory: async (page, pageSize, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectCategoryModel.find(
                    search ? { active: true, name: { $regex: search, $options: 'i' } } : { active: true }, { __v: 0 })
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize * 1)

            )
        });
    },
    findByProjectCategoryId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectCategoryModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    countProjectCategory: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectCategoryModel.countDocuments({ active: true })
            )
        });
    },
    findProjectCategory: async (name) => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectCategoryModel.findOne(
                    { name },
                    { __v: 0 }
                )
            )
        });
    },
    createProjectCategory: async (req_data) => {
        return new Promise(async (resolve) => {
            await projectCategoryModel.insertMany({ ...req_data });
            return resolve(
                await projectCategoryModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    updateProjectCategory: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await projectCategoryModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await projectCategoryModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteProjectCategory: async (_id) => {
        return new Promise(async (resolve) => {
            await projectCategoryModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await projectCategoryModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}