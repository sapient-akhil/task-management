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
            const pageSize = 10
            const total = await assignedProjectServices.countAssignedProject();
            const pageCount = Math.ceil(total / pageSize)
            const user = req.query.user

            const all_assignedProject = await assignedProjectServices.findAllAssignedProject(page, pageSize, user)
            if (!all_assignedProject) throw createError.NotFound("No any assigned project is found.")

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