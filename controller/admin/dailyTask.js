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

            const req_data = req.body
            console.log("req_data", req_data)

            let user = req_data.user ? JSON.parse(req_data.user) : [];
            let project = req_data.project ? JSON.parse(req_data.project) : [];
            let project_category = req_data.project_category ? JSON.parse(req_data.project_category) : []
            req_data.date = req_data.date ? JSON.parse(req_data.date) : []

            let filter = []
            const pageObj = { page_per: pageSize, page_no: page }

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

            let dateFilter;

            if (req_data.startDate && !req_data.endDate) {
                dateFilter = {
                    $gte: ["$date", new Date(req_data.startDate)]
                };
                filter.push(dateFilter)

            }
            if (!req_data.startDate && req_data.endDate) {
                dateFilter = {
                    $lte: ["$date", new Date(req_data.endDate)]
                };
                filter.push(dateFilter)

            }
            if (req_data.startDate && req_data.endDate) {
                if (req_data.startDate === req_data.endDate) {
                    dateFilter = {
                        $eq: ["$date", new Date(req_data.startDate)]
                    };
                    filter.push(dateFilter);
                } else {
                    dateFilter = {
                        $and: [
                            { $gte: ["$date", new Date(req_data.startDate)] },
                            { $lte: ["$date", new Date(req_data.endDate)] }
                        ]
                    };
                    filter.push(dateFilter);
                }
            }

            const total = await dailyTaskServices.findActiveTaskForAdmin(filter)
            console.log("total", total)
            let pageCount = 0;
            let dailyTask = [];
            let totalTimeFormated = `00:00`;

            if (total.length > 0) {
                pageCount = Math.ceil(total[0]?.total / pageSize)

                dailyTask = await dailyTaskServices.findAllDailyTask(filter, pageObj)

                const totalTime = await dailyTaskServices.totalTime(filter)

                totalTimeFormated = {
                    hours: totalTime[0]?.totalHour < 10 ? `0${totalTime[0]?.totalHour}` : totalTime[0]?.totalHour,
                    minutes: totalTime[0]?.totalMinutes < 10 ? `0${totalTime[0]?.totalMinutes}` : totalTime[0]?.totalMinutes,
                }
                res.status(201).send({
                    success: true,
                    message: "All daily task is fetch successfully.",
                    data: dailyTask,
                    meta: {
                        pagination: {
                            page, pageSize, pageCount, total: total[0].total
                        }
                    },
                    totalTime: totalTimeFormated
                })
            } else {
                res.status(201).send({
                    success: true,
                    message: "All daily task is fetch successfully.",
                    data: [],
                    meta: {
                        pagination: {
                            page, pageSize, pageCount, total: 0
                        }
                    },
                    totalTime: totalTimeFormated
                })
            }


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