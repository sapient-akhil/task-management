const technology_skills_model = require("./technology_skills.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    find_technology_skills: async (technology_skills) => {
        return new Promise(async (resolve) => {
            return resolve(
                await technology_skills_model.findOne(
                    { technology_skills },
                    projectionFields
                )
            )
        });
    },
    find_all_technology_skills: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await technology_skills_model.find({}, projectionFields)
            )
        });
    },
    find_by_technology_skills_id: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await technology_skills_model.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    create_update_technology_skills: async (technology_skills, req_data) => {
        return new Promise(async (resolve) => {
            await technology_skills_model.updateOne({ technology_skills }, { ...req_data }, { upsert: true });
            return resolve(
                await technology_skills_model.find(
                    { technology_skills },
                    projectionFields
                )
            );
        });
    },
    delete_technology_skills: async (_id) => {
        return new Promise(async (resolve) => {
            await technology_skills_model.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await technology_skills_model.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}