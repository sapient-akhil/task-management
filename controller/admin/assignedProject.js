const createError = require("http-errors")
const { assignedProjectServices } = require("../../services/index")
const assignedProjectModel = require("../../services/assignedProject/assignedProject.model")
const { calculateHourAndMinutes } = require("../../helper/function")
const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

module.exports = {
    createAssignedProject: async (req, res, next) => {
        try {
            const req_data = req.body;

            req_data.project = await JSON.parse(req_data.project);
            req_data.project_category = await JSON.parse(req_data.project_category);

            // const data = await assignedProjectServices.totalTime(req_data?.project, req_data?.user)
            // let hh = 0;
            // let mm = 0;
            // list.forEach((item) => {
            //     hh += item?.hours;
            //     mm += item?.minutes;
            // });
            // const totalTime = calculateHourAndMinutes(hh, mm);
            // console.log("totalTime", totalTime)
            const assignedProject = await assignedProjectServices.createAssignedProject(req_data)

            res.status(201).send({
                success: true,
                message: "Assigned project is created successfully.",
                data: assignedProject,
            })
        } catch (error) {
            next(error)
        }
    },
    allAssignedProject: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);

            const req_data = req.body;
            console.log("req_data", req_data)
            // let user = req.query?.user
            // if (!user) {
            //     user = {}
            // }
            // Parse user and project as arrays
            let users = req_data.user ? JSON.parse(req_data.user) : [];
            console.log(users)

            let projects = req_data.project ? JSON.parse(req_data.project) : [];

            // Create a filter object
            let filter = [{ active: true }];

            if (users.length > 0) {
                users = await users.map((item) => {
                    item = new ObjectId(item);
                    return item;
                })
                console.log("user", users);

                filter.push({ $in: ["$user", users] });
            }
            if (projects.length) {
                projects = await projects.map((item) => {
                    item = new ObjectId(item);
                    return item;
                })
                filter.push({ $in: ["$project", projects] });
            }
            // const data2 = await assignedProjectModel.find(filter)
            console.log("Filter", JSON.stringify(filter))
            // const aggregationPipeline = [
            //     {
            //         $unwind: "$project",
            //     },
            //     { $match: { $expr: { $and: filter } } },
            //     {
            //         $group: {
            //             _id: {
            //                 projectId: "$project",
            //                 user: "$user",
            //             },
            //             startDate: { $first: "$startDate" },
            //             endDate: { $first: "$endDate" },
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: "dailytasks",
            //             let: {
            //                 projectId: "$_id.projectId",
            //                 userId: "$_id.user",
            //             },
            //             pipeline: [
            //                 {
            //                     $match: {
            //                         $expr: {
            //                             $and: [
            //                                 { $eq: ["$project", "$$projectId"] },
            //                                 { $eq: ["$user", "$$userId"] },
            //                             ],
            //                         },
            //                     },
            //                 },
            //                 {
            //                     $group: {
            //                         _id: {
            //                             project: "$project",
            //                             user: "$user",
            //                         },
            //                         totalHour: { $sum: "$hours" },
            //                         totalMinutes: { $sum: "$minutes" },
            //                     },
            //                 },
            //                 {
            //                     $addFields: {
            //                         totalHour: {
            //                             $add: [
            //                                 "$totalHour", // Existing total hours
            //                                 {
            //                                     $floor: {
            //                                         $divide: ["$totalMinutes", 60] // Convert total minutes to hours
            //                                     }
            //                                 }
            //                             ]
            //                         },
            //                         totalMinutes: {
            //                             $mod: ["$totalMinutes", 60] // Calculate remaining minutes
            //                         }
            //                     }
            //                 }
            //             ],
            //             as: "data",
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: "projects",
            //             localField: "data._id.project",
            //             foreignField: "_id",
            //             as: "projectName",
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: "users",
            //             localField: "data._id.user",
            //             foreignField: "_id",
            //             as: "userName",
            //         },
            //     },
            // ];

            const list = await assignedProjectServices.findAllAssignedProject(filter, page, pageSize);

            const total = await assignedProjectServices.countAssignedProject(filter);
            const pageCount = Math.ceil(total / pageSize);

            res.status(201).send({
                success: true,
                message: "All assigned projects fetched successfully.",
                data: list,
                meta: {
                    pagination: {
                        page,
                        pageSize,
                        pageCount,
                        total: list.length,
                    },
                },
            });
        } catch (error) {
            next(error);
        }
    },
    // allAssignedProject: async (req, res, next) => {
    //     try {

    //         const page = parseInt(req.query.page || 1);
    //         const pageSize = parseInt(req.query.pageSize || 10);

    //         const req_data = req.body

    //         let user = req.body?.user
    //         if (!user) {
    //             user = {}
    //         }

    //         const data1 = [
    //             { $unwind: "$project" },
    //             {
    //                 $group: {
    //                     _id: {
    //                         projectId: "$project",
    //                         user: "$user"
    //                     },
    //                     startDate: { $first: "$startDate" },
    //                     endDate: { $first: "$endDate" }
    //                 }
    //             },
    //             {
    //                 $match: {
    //                     $or: [
    //                         {
    //                             "_id.user": {
    //                                 $in: req_data.user ? JSON.parse(req_data.user) : []
    //                             }
    //                         },
    //                         {
    //                             "_id.projectId": {
    //                                 $in: req_data.project ? JSON.parse(req_data.project) : []
    //                             }
    //                         }
    //                     ],
    //                     active: true
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: "dailytasks",
    //                     let: {
    //                         projectId: "$_id.projectId",
    //                         userId: "$_id.user"
    //                     },
    //                     pipeline: [
    //                         {
    //                             $match: {
    //                                 $expr: {
    //                                     $and: [
    //                                         { $eq: ["$project", "$$projectId"] },
    //                                         { $eq: ["$user", "$$userId"] }
    //                                     ]
    //                                 }
    //                             }
    //                         },
    //                         {
    //                             $group: {
    //                                 _id: {
    //                                     project: "$project",
    //                                     user: "$user"
    //                                 },
    //                                 totalHour: { $sum: "$hours" },
    //                                 totalMinutes: { $sum: "$minutes" }
    //                             }
    //                         }
    //                     ],
    //                     as: "data"
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: "projects",
    //                     localField: "data._id.project",
    //                     foreignField: "_id",
    //                     as: "projectName"
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: "users",
    //                     localField: "data._id.user",
    //                     foreignField: "_id",
    //                     as: "userName"
    //                 }
    //             }
    //         ]
    //         console.log("User Filter:", req_data.user);
    //         console.log("Project Filter:", req_data.project);
    //         let list = await assignedProjectModel.aggregate(
    //             data1
    //         );

    //         const data = await assignedProjectServices.totalTime(req_data?.project, req_data?.user)
    //         let hh = 0;
    //         let mm = 0;
    //         data.forEach((item) => {
    //             hh += item?.hours;
    //             mm += item?.minutes;
    //         });
    //         const totalTime = calculateHourAndMinutes(hh, mm);
    //         console.log("totalTime", totalTime)

    //         const total = await assignedProjectServices.countAssignedProject(filter);
    //         const pageCount = Math.ceil(total / pageSize)

    //         res.status(201).send({
    //             success: true,
    //             message: "All assigned project is fetch successfully.",
    //             data: list,
    //             meta: {
    //                 pagination: {
    //                     page, pageSize, pageCount, total
    //                 }
    //             }
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // },
    oneAssignedProject: async (req, res, next) => {
        try {

            const { id } = req.params

            const assignedProject = await assignedProjectServices.findByAssignedProjectId(id)
            if (!assignedProject) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One assigned project is fetch successfully.",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    },
    updateAssignedProject: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            req_data.project = await JSON.parse(req_data.project);
            req_data.project_category = await JSON.parse(req_data.project_category);

            const assignedProject = await assignedProjectServices.updateAssignedProject(id, req_data)
            if (!assignedProject) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Assigned project is update successfully.",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    },
    deleteAssignedProject: async (req, res, next) => {
        try {

            const { id } = req.params

            const assignedProject = await assignedProjectServices.deleteAssignedProject(id)
            if (!assignedProject) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Assigned project is delete successfully",
                data: assignedProject
            })
        } catch (error) {
            next(error)
        }
    }
}