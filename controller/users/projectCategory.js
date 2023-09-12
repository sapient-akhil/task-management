const createError = require("http-errors")
const { projectCategoryServices } = require("../../services/index")

module.exports = {
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
            if (!projectCategory) throw createError.NotFound("The project category data with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One project category data is fetch successfully.",
                data: projectCategory
            })
        } catch (error) {
            next(error)
        }
    }
}