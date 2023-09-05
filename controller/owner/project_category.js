const createError = require("http-errors")
const { project_category_services } = require("../../services/index")

module.exports = {
    create_project_category: async (req, res, next) => {
        try {
            const req_data = req.body;

            const project_category = await project_category_services.find_project_category(req_data.name);
            if (project_category) throw createError.Conflict("project_category already define.")

            const project_category_data = await project_category_services.create_project_category(req_data)

            res.status(201).send({
                success: true,
                message: "project_category is successfully created.",
                data: project_category_data
            })
        } catch (error) {
            next(error)
        }
    },
    all_project_category: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = 2
            const total = await project_category_services.count_project_category();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search
            const project_category = await project_category_services.find_all_project_category(page, pageSize, search)

            res.status(201).send({
                success: true,
                message: "All project_category data is fetch successfully.",
                data: project_category,
                meta: {
                    pagination: {
                        page, pageSize, pageCount, total
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    },
    one_project_category: async (req, res, next) => {
        try {

            const { id } = req.params

            const project_category = await project_category_services.find_by_project_category_id(id)
            if (!project_category) throw createError.NotFound("The project_categoryData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One project_category data is fetch successfully.",
                data: project_category
            })
        } catch (error) {
            next(error)
        }
    },
    update_project_category: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const project_category = await project_category_services.find_project_category(req_data.name);
            if (project_category) throw createError.Conflict("project_category already define.")

            const project_category_data = await project_category_services.update_project_category(id, req_data)

            res.status(201).send({
                success: true,
                message: "project_category is update successfully.",
                data: project_category_data
            })
        } catch (error) {
            next(error)
        }
    },
    delete_project_category: async (req, res, next) => {
        try {

            const { id } = req.params

            const project_category = await project_category_services.delete_project_category(id)
            if (!project_category) throw createError.NotFound("The project_categoryData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "project_category delete successfully",
                data: project_category
            })
        } catch (error) {
            next(error)
        }
    }
}