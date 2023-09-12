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

            // let hh = 0;
            // let mm = 0;
            // daily_task.forEach((item) => {
            //     hh += item?.hours;
            //     mm += item?.minutes;
            // });
            // const totalTime = await calculateHourAndMinutes(hh, mm);
            // console.log("data.totalTime", totalTime)

            let filter = { active: true }
            const pageObj = { page_per: pageSize, page_no: page }

            if (user && user.length) {
                filter.user = { $in: user }
            }
            const allAssignedProject = await assignedProjectServices.findAllAssignedProject(filter, pageObj, user)
            if (!allAssignedProject.length) throw createError.NotFound("No any user found with providede ID project is found.")

            res.status(201).send({
                success: true,
                message: "All assigned project is fetch successfully.",
                data: allAssignedProject,
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
    }
}