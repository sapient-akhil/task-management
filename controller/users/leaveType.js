const createError = require("http-errors")
const { leaveTypeServices } = require("../../services/index")

module.exports = {
    allLeaveType: async (req, res, next) => {
        try {

            const leaveType = await leaveTypeServices.findAllLeaveType()

            res.status(201).send({
                success: true,
                message: "All leave type is fetch successfully.",
                data: leaveType
            })
        } catch (error) {
            next(error)
        }
    },
    oneLeaveType: async (req, res, next) => {
        try {

            const { id } = req.params

            const leaveType = await leaveTypeServices.findByLeaveTypeId(id)
            if (!leaveType) throw createError.NotFound("The leave type with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One leave type is fetch successfully.",
                data: leaveType
            })
        } catch (error) {
            next(error)
        }
    }
}