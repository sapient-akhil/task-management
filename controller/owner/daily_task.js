const createError = require("http-errors")
const { daily_task_services } = require("../../services/index")

module.exports = {
    all_daily_task: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 5);
            const total = await daily_task_services.count_daily_task();
            const pageCount = Math.ceil(total / pageSize)
            // const user = req.query.user
            const req_data = req.body

            req_data.user = req_data.user ? JSON.parse(req_data.user) : []
            req_data.project = req_data.project ? JSON.parse(req_data.project) : []
            req_data.project_category = req_data.project_category ? JSON.parse(req_data.project_category) : []
            req_data.date = req_data.date ? JSON.parse(req_data.date) : null
            let filter = {}
            const pageObj = { page_per: pageSize, page_no: page }
            // req_data.date = req_data.date ? JSON.parse(req_data.date) : null
            if (req_data.user && req_data.user.length) {
                filter.user = { $in: req_data.user }
            }
            if (req_data.project && req_data.project.length) {
                filter.project = { $in: req_data.project }
            }
            if (req_data.project_category && req_data.project_category.length) {
                filter.project_category = { $in: req_data.project_category }
            }
            if (req_data.date && req_data.date.length === 2) {
                filter.date = { $gte: new Date(req_data.date[0]), $lte: new Date(req_data.date[1]) }
            }
            const daily_task = await daily_task_services.find_all_daily_task(filter, pageObj)
            console.log("daily_task : ", daily_task)

            res.status(201).send({
                success: true,
                message: "All daily task is fetch successfully.",
                data: daily_task,
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
    one_daily_task: async (req, res, next) => {
        try {

            const { id } = req.params

            const daily_task = await daily_task_services.find_by_daily_task_id(id)
            if (!daily_task) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One daily task is fetch successfully.",
                data: daily_task
            })
        } catch (error) {
            next(error)
        }
    },
    update_daily_task: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const daily_task = await daily_task_services.update_daily_task(id, req_data)
            if (!daily_task.length) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Daily task is update successfully.",
                data: daily_task
            })
        } catch (error) {
            next(error)
        }
    },
    delete_daily_task: async (req, res, next) => {
        try {

            const { id } = req.params

            const daily_task = await daily_task_services.delete_daily_task(id)
            if (!daily_task) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Daily task is delete successfully",
                data: daily_task
            })
        } catch (error) {
            next(error)
        }
    }
}