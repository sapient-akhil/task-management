const createError = require("http-errors")
const { leaveServices } = require("../../services/index")

module.exports = {
    createLeave: async (req, res, next) => {
        try {
            const req_data = req.body;

            const leave = await leaveServices.createLeave(req_data)

            res.status(201).send({
                success: true,
                message: "Leave is successfully created.",
                data: leave
            })
        } catch (error) {
            next(error)
        }
    },
    allLeave: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = 10
            const total = await leaveServices.countLeave();
            const pageCount = Math.ceil(total / pageSize)
            // const search = req.query.search
            const leave = await leaveServices.findAllLeave(page, pageSize)

            res.status(201).send({
                success: true,
                message: "All Leave data is fetch successfully.",
                data: leave,
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
    oneLeave: async (req, res, next) => {
        try {

            const { id } = req.params

            const leave = await leaveServices.findByLeaveId(id)
            if (!leave) throw createError.NotFound("The Leave Data with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One Leave data is fetch successfully.",
                data: leave
            })
        } catch (error) {
            next(error)
        }
    }
}