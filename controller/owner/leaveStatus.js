const createError = require("http-errors")
const { leaveStatusServices } = require("../../services/index")

module.exports = {
    createLeaveStatus: async (req, res, next) => {
        try {
            const req_data = req.body;

            const leaveStatus = await leaveStatusServices.findLeaveStatus(req_data.name);
            if (leaveStatus) throw createError.Conflict("This leave status is already exists.")

            const leaveStatusData = await leaveStatusServices.createLeaveStatus(req_data)

            res.status(201).send({
                success: true,
                message: "LeaveStatus is created successfully.",
                data: leaveStatusData
            })
        } catch (error) {
            next(error)
        }
    },
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
    },
    updateLeaveStatus: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const leaveStatus = await leaveStatusServices.findLeaveStatus(req_data.name);
            if (leaveStatus) throw createError.Conflict("This leave status is already exists.")

            const leaveStatusData = await leaveStatusServices.updateLeaveStatus(id, req_data)
            if (!leaveStatusData.length) throw createError.NotFound("The LeaveStatus with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "LeaveStatus is update successfully.",
                data: leaveStatus
            })
        } catch (error) {
            next(error)
        }
    },
    deleteLeaveStatus: async (req, res, next) => {
        try {

            const { id } = req.params

            const leaveStatus = await leaveStatusServices.deleteLeaveStatus(id)
            if (!leaveStatus) throw createError.NotFound("The LeaveStatus with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "LeaveStatus is delete successfully",
                data: leaveStatus
            })
        } catch (error) {
            next(error)
        }
    }
}