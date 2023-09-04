const createError = require("http-errors")
const { project_category_services } = require("../../services/index")

module.exports = {
    create_project_category: async (req, res, next) => {
        try {
            const req_data = req.body;

            const technology_skill = await project_category_services.find_project_category(req_data.project_category);
            if (technology_skill) throw createError.Conflict("project_category already define.")

            const project_categoryData = await project_category_services.create_project_category(req_data)

            res.status(201).send({
                success: true,
                message: "project_category is loaded..",
                data: project_categoryData
            })
        } catch (error) {
            next(error)
        }
    },
    all_project_category: async (req, res, next) => {
        try {

            const allproject_categoryData = await project_category_services.find_all_project_category()

            res.status(201).send({
                success: true,
                message: "get all project_category_data",
                data: allproject_categoryData
            })
        } catch (error) {
            next(error)
        }
    },
    one_project_category: async (req, res, next) => {
        try {

            const { id } = req.params

            const project_categoryData = await project_category_services.find_by_project_category_id(id)
            if (!project_categoryData) throw createError.NotFound("The project_categoryData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one project_category_data",
                data: project_categoryData
            })
        } catch (error) {
            next(error)
        }
    },
    update_project_category: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const technology_skill = await project_category_services.find_project_category(req_data.project_category);
            if (technology_skill) throw createError.Conflict("project_category already define.")

            const project_categoryData = await project_category_services.update_project_category(id,req_data)

            res.status(201).send({
                success: true,
                message: "project_category is loaded..",
                data: project_categoryData
            })
        } catch (error) {
            next(error)
        }
    },
    delete_project_category: async (req, res, next) => {
        try {

            const { id } = req.params

            const project_categoryData = await project_category_services.delete_project_category(id)
            if (!project_categoryData) throw createError.NotFound("The project_categoryData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "project_category_data delete successfully",
                data: project_categoryData
            })
        } catch (error) {
            next(error)
        }
    }
}