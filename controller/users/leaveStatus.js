const createError = require("http-errors")
const { leaveStatusServices } = require("../../services/index")

module.exports = {
    allLeaveStatus: async (req, res, next) => {
        try {
            const leaveStatus = await leaveStatusServices.findAllLeaveStatus()

            res.status(201).send({
                success: true,
                message: "All leaveStatus is fetch successfully.",
                data: leaveStatus
            })
        } catch (error) {
            next(error)
        }
    },
    oneLeaveStatus: async (req, res, next) => {
        try {

            const { id } = req.params

            const leaveStatus = await leaveStatusServices.findByLeaveStatusId(id)
            if (!leaveStatus) throw createError.NotFound("The LeaveStatus with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One LeaveStatus is fetch successfully.",
                data: leaveStatus
            })
        } catch (error) {
            next(error)
        }
    }
}