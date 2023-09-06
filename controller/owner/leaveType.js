const createError = require("http-errors")
const { leaveTypeServices } = require("../../services/index")

module.exports = {
    createLeaveType: async (req, res, next) => {
        try {
            const req_data = req.body;

            const leaveType = await leaveTypeServices.findLeaveType(req_data.name);
            if (leaveType) throw createError.Conflict("This leave type is already exists.")

            const leaveTypeData = await leaveTypeServices.createLeaveType(req_data)

            res.status(201).send({
                success: true,
                message: "LeaveType is created successfully.",
                data: leaveTypeData
            })
        } catch (error) {
            next(error)
        }
    },
    allLeaveType: async (req, res, next) => {
        try {

            const leaveType = await leaveTypeServices.findAllLeaveType()

            res.status(201).send({
                success: true,
                message: "All LeaveType is fetch successfully.",
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
            if (!leaveType) throw createError.NotFound("The LeaveType with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One LeaveType is fetch successfully.",
                data: leaveType
            })
        } catch (error) {
            next(error)
        }
    },
    updateLeaveType: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const leaveType = await leaveTypeServices.findLeaveType(req_data.name);
            if (leaveType) throw createError.Conflict("This leave type is already exists.")

            const leaveTypeData = await leaveTypeServices.updateLeaveType(id, req_data)
            if (!leaveTypeData.length) throw createError.NotFound("The LeaveType with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "LeaveType is update successfully.",
                data: leaveTypeData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteLeaveType: async (req, res, next) => {
        try {

            const { id } = req.params

            const leaveType = await leaveTypeServices.deleteLeaveType(id)
            if (!leaveType) throw createError.NotFound("The LeaveType with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "LeaveType is delete successfully",
                data: leaveType
            })
        } catch (error) {
            next(error)
        }
    }
}