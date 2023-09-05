const technology_skills_model = require("./technology_skills.model")
const projectionFields = { __v: 0 }

module.exports = {
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
    create_technology_skills: async (req_data) => {
        return new Promise(async (resolve) => {
            await technology_skills_model.insertMany({ ...req_data });
            return resolve(
                await technology_skills_model.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    update_technology_skills: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await technology_skills_model.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await technology_skills_model.find(
                    { _id },
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