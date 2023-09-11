const createError = require("http-errors")
const { leaveServices } = require("../../services/index")

module.exports = {
    allLeave: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = 10
            const total = await leaveServices.countLeave();
            const pageCount = Math.ceil(total / pageSize)

            const req_data = req.body

            req_data.leaveStatus = req_data.leaveStatus ? JSON.parse(req_data.leaveStatus) : []
            // req_data.project = req_data.project ? JSON.parse(req_data.project) : []

            let filter = {}
            const pageObj = { page_per: pageSize, page_no: page }

            if (req_data.leaveStatus && req_data.leaveStatus.length) {
                filter.leaveStatus = { $in: req_data.leaveStatus }
            }
            // if (req_data.date && req_data.date.length === 2) {
            //     filter.date = { $gte: new Date(req_data.date[0]), $lte: new Date(req_data.date[1]) }
            // }
            const leave = await leaveServices.findAllLeave(filter, pageObj)

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
    },
    updateLeave: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const leave = await leaveServices.updateLeave(id, req_data)

            res.status(201).send({
                success: true,
                message: "Leave is update successfully.",
                data: leave
            })
        } catch (error) {
            next(error)
        }
    },
    deleteLeave: async (req, res, next) => {
        try {

            const { id } = req.params

            const leave = await leaveServices.deleteLeave(id)
            if (!leave) throw createError.NotFound("The Leave data with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Leave delete successfully",
                data: leave
            })
        } catch (error) {
            next(error)
        }
    }
}