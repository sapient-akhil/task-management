const createError = require("http-errors")
const { assignedProjectServices } = require("../../services/index")

module.exports = {
    allAssignedProject: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);
            const total = await assignedProjectServices.countAssignedProject();
            const pageCount = Math.ceil(total / pageSize)
            // const search = req.query.search
            let user = req.query?.user
            if (!user) {
                user = {}
            }

            let filter = { active: true }
            const pageObj = { page_per: pageSize, page_no: page }

            if (user && user.length) {
                filter.user = { $in: user }
            }
            const all_assigned_project = await assignedProjectServices.findAllAssignedProject(filter, pageObj, user)
            if (!all_assigned_project.length) throw createError.NotFound("No any user found with providede ID project is found.")

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
    oneAssignedProject: async (req, res, next) => {
        try {

            const { id } = req.params

            const assigned_project = await assignedProjectServices.findByAssignedProjectId(id)
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