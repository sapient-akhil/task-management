const project_category_model = require("./project_category.model")
const projectionFields = { __v: 0 }

module.exports = {
    find_project_category: async (project_category) => {
        return new Promise(async (resolve) => {
            return resolve(
                await project_category_model.findOne(
                    { project_category },
                    projectionFields
                )
            )
        });
    },
    find_all_project_category: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await project_category_model.find({}, projectionFields)
            )
        });
    },
    find_by_project_category_id: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await project_category_model.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    create_project_category: async (req_data) => {
        return new Promise(async (resolve) => {
            await project_category_model.insertMany({ ...req_data });
            return resolve(
                await project_category_model.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    update_project_category: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await project_category_model.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await project_category_model.find(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    delete_project_category: async (_id) => {
        return new Promise(async (resolve) => {
            await project_category_model.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await project_category_model.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}