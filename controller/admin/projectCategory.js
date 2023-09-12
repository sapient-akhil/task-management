const createError = require("http-errors")
const { projectCategoryServices } = require("../../services/index")

module.exports = {
    createProjectCategory: async (req, res, next) => {
        try {
            const req_data = req.body;

            const projectCategory = await projectCategoryServices.findProjectCategory(req_data.name);
            if (projectCategory) throw createError.Conflict("Project category already exist.")

            const projectCategoryData = await projectCategoryServices.createProjectCategory(req_data)

            res.status(201).send({
                success: true,
                message: "Project category is successfully created.",
                data: projectCategoryData
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
            const projectCategory = await projectCategoryServices.findAllProjectCategory(page, pageSize, search)

            res.status(201).send({
                success: true,
                message: "All project category data is fetch successfully.",
                data: projectCategory,
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

            const projectCategory = await projectCategoryServices.findByProjectCategoryId(id)
            if (!projectCategory) throw createError.NotFound("The project category with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One project category data is fetch successfully.",
                data: projectCategory
            })
        } catch (error) {
            next(error)
        }
    },
    updateProjectCategory: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const projectCategory = await projectCategoryServices.findProjectCategory(req_data.name);
            if (projectCategory) throw createError.Conflict("Project category already exist.")

            const projectCategoryData = await projectCategoryServices.updateProjectCategory(id, req_data)

            res.status(201).send({
                success: true,
                message: "Project category is update successfully.",
                data: projectCategoryData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteProjectCategory: async (req, res, next) => {
        try {

            const { id } = req.params

            const projectCategory = await projectCategoryServices.deleteProjectCategory(id)
            if (!projectCategory) throw createError.NotFound("The project category data with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Project category delete successfully",
                data: projectCategory
            })
        } catch (error) {
            next(error)
        }
    }
}