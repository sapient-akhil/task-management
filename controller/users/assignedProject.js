
const createError = require("http-errors");
const { assignedProjectServices } = require("../../services/index");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    allAssignedProject: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);

            let user = req.query?.user
            user = new ObjectId(user);

            console.log("user", user)

            let filter = { active: true };

            const allAssignedProject = await assignedProjectServices.findAllAssignedProjectForUser(user, page, pageSize)
            if (!allAssignedProject.length) throw createError.NotFound("No any user found with providede ID project is found.")

            const total = await assignedProjectServices.countAssignedProject(filter);
            const pageCount = Math.ceil(total / pageSize)

            res.status(201).send({
                success: true,
                message: "All assigned project is fetch successfully.",
                data: allAssignedProject,
                meta: {
                    pagination: {
                        page, pageSize, pageCount, total: allAssignedProject.length
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
    }
}