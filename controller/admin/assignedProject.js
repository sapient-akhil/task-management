const createError = require("http-errors")
const { assignedProjectServices } = require("../../services/index")

module.exports = {
    createAssignedProject: async (req, res, next) => {
        try {
            const req_data = req.body;

            req_data.project = await JSON.parse(req_data.project);
            req_data.project_category = await JSON.parse(req_data.project_category);

            const assignedProject = await assignedProjectServices.createAssignedProject(req_data)

            res.status(201).send({
                success: true,
                message: "Assigned project is created successfully.",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    },
    allAssignedProject: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);
            const total = await assignedProjectServices.countAssignedProject();
            const pageCount = Math.ceil(total / pageSize)
            const req_data = req.body

            let user = req.body?.user
            if (!user) {
                user = {}
            }

            req_data.user = req_data.user ? JSON.parse(req_data.user) : []
            req_data.project = req_data.project ? JSON.parse(req_data.project) : []

            let filter = { active: true }
            const pageObj = { page_per: pageSize, page_no: page }

            if (req_data.user && req_data.user.length) {
                filter.user = { $in: req_data.user }
            }
            if (req_data.project && req_data.project.length) {
                filter.project = { $in: req_data.project }
            }

            const all_assignedProject = await assignedProjectServices.findAllAssignedProject(filter, pageObj, user)
            if (!all_assignedProject) throw createError.NotFound("No any assigned project is found.")
            console.log("all_assignedProject : ", all_assignedProject)

            res.status(201).send({
                success: true,
                message: "All assigned project is fetch successfully.",
                data: all_assignedProject,
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

            const assignedProject = await assignedProjectServices.findByAssignedProjectId(id)
            if (!assignedProject) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One assigned project is fetch successfully.",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    },
    updateAssignedProject: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            req_data.project = await JSON.parse(req_data.project);
            req_data.project_category = await JSON.parse(req_data.project_category);

            const assignedProject = await assignedProjectServices.updateAssignedProject(id, req_data)
            if (!assignedProject) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Assigned project is update successfully.",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    },
    deleteAssignedProject: async (req, res, next) => {
        try {

            const { id } = req.params

            const assignedProject = await assignedProjectServices.deleteAssignedProject(id)
            if (!assignedProject) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Assigned project is delete successfully",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    }
}