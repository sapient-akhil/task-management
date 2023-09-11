const projectsModel = require("./projects.model")

module.exports = {
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
                    } : { active: true }, { __v: 0 })
                    // .populate("technology_skills", { __v: 0 })
                    .limit(pageSize * 1)
                    .skip((page - 1) * pageSize)
                    .sort({ createdAt: -1 })
            )
        });
    },
    findByProjectsId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectsModel.findOne(
                    { _id },
                    { __v: 0 }
                )
                    // .populate("technology_skills", { __v: 0 })

            );
        });
    },
    countProjects: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await projectsModel.countDocuments()
            )
        });
    },
    createProjects: async (req_data) => {
        return new Promise(async (resolve) => {
            await projectsModel.insertMany({ ...req_data });
            return resolve(
                await projectsModel.find(
                    { ...req_data },
                    { __v: 0 }
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
                    { __v: 0 }
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
                    { __v: 0 }
                )
            );
        });
    }
}