const projectsModel = require("./projects.model")
const projectionFields = { __v: 0 }

module.exports = {
    countProjects: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectsModel.countDocuments()
            )
        });
    },
    findAllProjects: async (page, pageSize, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectsModel.find(
                    search ? {
                        active: true,
                        $or:
                            [
                                { name: { $regex: search, $options: 'i' } },
                                { description: { $regex: search, $options: 'i' } },
                            ]
                    } : { active: true }, projectionFields)
                    .populate("technology_skills", projectionFields)
                    .limit(pageSize * 1)
                    .skip((page - 1) * pageSize)
            )
        });
    },
    findByProjectsId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectsModel.findOne(
                    { _id },
                    projectionFields
                )
                .populate("technology_skills", projectionFields)

            );
        });
    },
    createProjects: async (req_data) => {
        return new Promise(async (resolve) => {
            await projectsModel.insertMany({ ...req_data });
            return resolve(
                await projectsModel.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    updateProjects: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await projectsModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await projectsModel.find(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    deleteProjects: async (_id) => {
        return new Promise(async (resolve) => {
            await projectsModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await projectsModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}