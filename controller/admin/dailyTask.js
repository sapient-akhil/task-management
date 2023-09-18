const createError = require("http-errors")
const { dailyTaskServices } = require("../../services/index")
const { calculateHourAndMinutes } = require('../../helper/function')
const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

module.exports = {
    allDailyTask: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);

            // const user = req.query.user
            const req_data = req.body
            console.log("req_data", req_data)

            // req_data.user = req_data.user ? JSON.parse(req_data.user) : []
            let user = req_data.user ? JSON.parse(req_data.user) : [];

            let project = req_data.project ? JSON.parse(req_data.project) : [];

            let project_category = req_data.project_category ? JSON.parse(req_data.project_category) : []

            req_data.date = req_data.date ? JSON.parse(req_data.date) : []

            let filter = []
            const pageObj = { page_per: pageSize, page_no: page }

            // if (req_data.user && req_data.user.length) {
            //     filter.user = { $in: req_data.user }
            // }
            if (user && user.length) {
                user = await user.map((item) => {
                    item = new ObjectId(item);
                    return item;
                })
                console.log("user", user);

                filter.push({ $in: ["$user", user] });
            }
            if (project && project.length) {
                project = await project.map((item) => {
                    item = new ObjectId(item);
                    return item;
                })
                filter.push({ $in: ["$project", project] });
            }

            if (project_category && project_category.length) {
                project_category = await project_category.map((item) => {
                    item = new ObjectId(item);
                    return item;
                })
                filter.push({ $in: ["$project_category", project_category] });
            }

            // if (req_data.date && req_data.date.length === 2) {
            //     date = await date.map((item) => {
            //         item = new ObjectId(item);
            //         return item;
            //     })
            //     filter.push({ $gte: new Date(req_data.date[0]), $lte: new Date(req_data.date[1]) });
            // }
            let dateFilter;
            if (req_data.date && req_data.date.length === 2) {
                dateFilter = {
                    $and: [{
                        $gte: ["$date", new Date(req_data.date[0])]
                    },
                    {
                        $lte: ["$date", new Date(req_data.date[1])]
                    }]
                }

                // console.log("filter.date", filter.date)
                filter.push(dateFilter)
            }

            const total = await dailyTaskServices.countDailyTask();
            const pageCount = Math.ceil(total / pageSize)

            const dailyTask = await dailyTaskServices.findAllDailyTask(filter, pageObj)
            // console.log("dailyTask : ", dailyTask)

            const totalTime = await dailyTaskServices.totalTime(filter)
            // console.log("totalTime : ", dailyTask)


            res.status(201).send({
                success: true,
                message: "All daily task is fetch successfully.",
                data: dailyTask,
                meta: {
                    pagination: {
                        page, pageSize, pageCount, total: dailyTask.length
                    }
                },
                totalTime
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