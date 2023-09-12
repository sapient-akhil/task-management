const createError = require("http-errors")
const { dailyTaskServices } = require("../../services/index")

module.exports = {
    allDailyTask: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);
            const total = await dailyTaskServices.countDailyTask();
            const pageCount = Math.ceil(total / pageSize)
            // const user = req.query.user
            const req_data = req.body

            req_data.user = req_data.user ? JSON.parse(req_data.user) : []
            req_data.project = req_data.project ? JSON.parse(req_data.project) : []
            req_data.project_category = req_data.project_category ? JSON.parse(req_data.project_category) : []
            req_data.date = req_data.date ? JSON.parse(req_data.date) : null

            let filter = { active: true }
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
            const dailyTask = await dailyTaskServices.findAllDailyTask(filter, pageObj)
            console.log("dailyTask : ", dailyTask)

            res.status(201).send({
                success: true,
                message: "All daily task is fetch successfully.",
                data: dailyTask,
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
    oneDailyTask: async (req, res, next) => {
        try {

            const { id } = req.params

            const dailyTask = await dailyTaskServices.findByDailyTaskId(id)
            if (!dailyTask) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One daily task is fetch successfully.",
                data: dailyTask
            })
        } catch (error) {
            next(error)
        }
    },
    updateDailyTask: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const dailyTask = await dailyTaskServices.updateDailyTask(id, req_data)
            if (!dailyTask.length) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Daily task is update successfully.",
                data: dailyTask
            })
        } catch (error) {
            next(error)
        }
    },
    deleteDailyTask: async (req, res, next) => {
        try {

            const { id } = req.params

            const dailyTask = await dailyTaskServices.deleteDailyTask(id)
            if (!dailyTask) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Daily task is delete successfully",
                data: dailyTask
            })
        } catch (error) {
            next(error)
        }
    }
}