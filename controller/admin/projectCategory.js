const createError = require("http-errors")
const { projectCategoryServices } = require("../../services/index")

module.exports = {
    createProjectCategory: async (req, res, next) => {
        try {
            const req_data = req.body;

            const project_category = await projectCategoryServices.findProjectCategory(req_data.name);
            if (project_category) throw createError.Conflict("project_category already define.")

            const project_category_data = await projectCategoryServices.createProjectCategory(req_data)

            res.status(201).send({
                success: true,
                message: "project_category is successfully created.",
                data: project_category_data
            })
        } catch (error) {
            next(error)
        }
    },
    allProjectCategory: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);
            const total = await projectCategoryServices.countProjectCategory();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search
            const project_category = await projectCategoryServices.findAllProjectCategory(page, pageSize, search)

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
    oneProjectCategory: async (req, res, next) => {
        try {

            const { id } = req.params

            const project_category = await projectCategoryServices.findByProjectCategoryId(id)
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
    updateProjectCategory: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const project_category = await projectCategoryServices.findProjectCategory(req_data.name);
            if (project_category) throw createError.Conflict("project_category already define.")

            const project_category_data = await projectCategoryServices.updateProjectCategory(id, req_data)

            res.status(201).send({
                success: true,
                message: "project_category is update successfully.",
                data: project_category_data
            })
        } catch (error) {
            next(error)
        }
    },
    deleteProjectCategory: async (req, res, next) => {
        try {

            const { id } = req.params

            const project_category = await projectCategoryServices.deleteProjectCategory(id)
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