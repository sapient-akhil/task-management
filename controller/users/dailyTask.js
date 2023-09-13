const createError = require("http-errors")
const { dailyTaskServices, assignedProjectServices } = require("../../services/index")
const { calculateHourAndMinutes } = require("../../helper/function")
module.exports = {
    createDailyTask: async (req, res, next) => {
        try {
            const req_data = req.body;
            console.log("req_data", req_data)

            const daily_task = await dailyTaskServices.createDailyTask(req_data)

            const data = await assignedProjectServices.totalTime(req_data?.project, req_data?.user)
            let hh = 0;
            let mm = 0;
            data.forEach((item) => {
                hh += item?.hours;
                mm += item?.minutes;
            });
            const totalTime = calculateHourAndMinutes(hh, mm);
            console.log("totalTime", totalTime)
            res.status(201).send({
                success: true,
                message: "Daily task is created successfully.",
                data: daily_task
            })

        } catch (error) {
            next(error)
        }
    },
    allDailyTask: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);
           
            const user = req.query.user
            const req_data = req.body

            req_data.project = req_data.project ? JSON.parse(req_data.project) : []
            req_data.project_category = req_data.project_category ? JSON.parse(req_data.project_category) : []
            req_data.date = req_data.date ? JSON.parse(req_data.date) : null
            let filter = { active: true }
            const pageObj = { page_per: pageSize, page_no: page }

            if (user) {
                filter.user = [user]
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
            const daily_task = await dailyTaskServices.findAllDailyTask(filter, pageObj)
            // console.log("daily_task : ", daily_task)
            let hh = 0;
            let mm = 0;
            daily_task.forEach((item) => {
                hh += item?.hours;
                mm += item?.minutes;
            });

            const total = await dailyTaskServices.countDailyTask(filter);
            const pageCount = Math.ceil(total / pageSize)

            const totalTime = await calculateHourAndMinutes(hh, mm);
            console.log("data.totalTime", totalTime)

            res.status(201).send({
                success: true,
                message: "All daily task is fetch successfully.",
                data: daily_task,
                meta: {
                    pagination: {
                        page, pageSize, pageCount, total
                    }
                },
                totalTime: totalTime
            })
        } catch (error) {
            next(error)
        }
    },
    oneDailyTask: async (req, res, next) => {
        try {

            const { id } = req.params

            const daily_task = await dailyTaskServices.findByDailyTaskId(id)
            if (!daily_task) throw createError.NotFound("The daily task with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One daily task is fetch successfully.",
                data: daily_task
            })
        } catch (error) {
            next(error)
        }
    }
}