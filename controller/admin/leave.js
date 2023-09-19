const createError = require("http-errors")
const { leaveServices } = require("../../services/index")

module.exports = {
    allLeave: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page);
            const pageSize = parseInt(req.query.pageSize || 10);

            const req_data = req.body

            req_data.user = req_data.user ? JSON.parse(req_data.user) : []
            req_data.leaveStatus = req_data.leaveStatus ? JSON.parse(req_data.leaveStatus) : []
            req_data.fromDate = req_data.fromDate ? JSON.parse(req_data.fromDate) : []

            let filter = { active: true }
            const pageObj = { page_per: pageSize, page_no: page }
            if (req_data.user && req_data.user.length) {
                filter.user = { $in: req_data.user }
            }
            if (req_data.leaveStatus && req_data.leaveStatus.length) {
                filter.leaveStatus = { $in: req_data.leaveStatus }
            }
            // if (req_data.fromDate && req_data.fromDate.length === 2) {
            //     filter.fromDate = { $gte: new Date(req_data.fromDate[0]), $lte: new Date(req_data.fromDate[1]) }
            // }

            let dateFilter;

            if (req_data.startDate && !req_data.endDate) {
                dateFilter = {
                    $gte: ["$fromDate", new Date(req_data.startDate)]
                };
                filter.push(dateFilter)

            }
            if (!req_data.startDate && req_data.endDate) {
                dateFilter = {
                    $lte: ["$fromDate", new Date(req_data.endDate)]
                };
                filter.push(dateFilter)

            }
            if (req_data.startDate && req_data.endDate) {
                if (req_data.startDate === req_data.endDate) {
                    dateFilter = {
                        $eq: ["$fromDate", new Date(req_data.startDate)]
                    };
                    filter.push(dateFilter);
                } else {
                    dateFilter = {
                        $and: [
                            { $gte: ["$fromDate", new Date(req_data.startDate)] },
                            { $lte: ["$fromDate", new Date(req_data.endDate)] }
                        ]
                    };
                    filter.push(dateFilter);
                }
            }

            const total = await leaveServices.countLeave(filter);
            const pageCount = Math.ceil(total / pageSize)

            const leave = await leaveServices.findAllLeave(filter, pageObj)

            res.status(201).send({
                success: true,
                message: "All leave data is fetch successfully.",
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
            if (!leave) throw createError.NotFound("The leave Data with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One leave data is fetch successfully.",
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
            if (!leave) throw createError.NotFound("The leave data with the provided ID could not be found. Please ensure the ID is correct and try again")

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
            if (!leave) throw createError.NotFound("The leave data with the provided ID could not be found. Please ensure the ID is correct and try again")

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