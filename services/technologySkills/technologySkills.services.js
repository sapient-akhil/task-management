const technologySkillsModel = require("./technologySkills.model")

module.exports = {
    findAllTechnologySkills: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await technologySkillsModel.find({ active: true }, { __v: 0 }).sort({ createdAt: -1 })
            )
        });
    },
    createTechnologySkills: async (req_data) => {
        return new Promise(async (resolve) => {
            await technologySkillsModel.insertMany({ ...req_data });
            return resolve(
                await technologySkillsModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    findByTechnologySkillsId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await technologySkillsModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    findTechnologySkills: async (technology_skills) => {
        return new Promise(async (resolve) => {
            return resolve(
                await technologySkillsModel.findOne(
                    { technology_skills },
                    { __v: 0 }
                )
            )
        });
    },
    updateTechnologySkills: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await technologySkillsModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await technologySkillsModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteTechnologySkills: async (_id) => {
        return new Promise(async (resolve) => {
            await technologySkillsModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await technologySkillsModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}