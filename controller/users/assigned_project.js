const createError = require("http-errors")
const { assigned_project_services } = require("../../services/index")

module.exports = {
    all_assigned_project: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const pageSize = 2
            const total = await assigned_project_services.count_assigned_project();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search
            const user = req.query.user

            const all_assigned_project = await assigned_project_services.find_all_assigned_project(page, pageSize, user)
            if (!all_assigned_project) throw createError.NotFound("No any assigned project is found.")

            res.status(201).send({
                success: true,
                message: "All assigned project is fetch successfully.",
                data: all_assigned_project,
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
    one_assigned_project: async (req, res, next) => {
        try {

            const { id } = req.params

            const assigned_project = await assigned_project_services.find_by_assigned_project_id(id)
            if (!assigned_project) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One assigned project is fetch successfully.",
                data: assigned_project
            })
        } catch (error) {
            next(error)
        }
    }
}