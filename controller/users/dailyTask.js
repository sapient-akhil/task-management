const createError = require("http-errors")
const { dailyTaskServices, assignedProjectServices } = require("../../services/index")
const { calculateHourAndMinutes } = require("../../helper/function")
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    createDailyTask: async (req, res, next) => {
        try {
            const req_data = req.body;
            console.log("req_data", req_data)

            const daily_task = await dailyTaskServices.createDailyTask(req_data)

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

            const req_data = req.body
            let user = req.query?.user;
            user = new ObjectId(user);

            console.log("req_data", req_data)

            // let user = req_data.user ? JSON.parse(req_data.user) : [];

            let project = req_data.project ? JSON.parse(req_data.project) : [];

            let project_category = req_data.project_category ? JSON.parse(req_data.project_category) : []

            req_data.date = req_data.date ? JSON.parse(req_data.date) : []

            let filter = []
            const pageObj = { page_per: pageSize, page_no: page }

            // if (user && user.length) {
            //     user = await user.map((item) => {
            //         item = new ObjectId(item);
            //         return item;
            //     })
            //     console.log("user", user);

            //     filter.push({ $in: ["$user", user] });
            // }
            if (user) {
                filter.user = [user]
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
            if (req_data.date && req_data.date.length === 2) {
                dateFilter = {
                    $and: [{
                        $gte: ["$date", new Date(req_data.date[0])]
                    },
                    {
                        $lte: ["$date", new Date(req_data.date[1])]
                    }]
                }

                filter.push(dateFilter)
            }

            const total = await dailyTaskServices.countDailyTask();
            const pageCount = Math.ceil(total / pageSize)

            const dailyTask = await dailyTaskServices.findAllDailyTaskForUser(user, filter, pageObj)

            const totalTime = await dailyTaskServices.totalTime(filter)
            console.log("totalTime : ", totalTime)


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