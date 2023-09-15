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
            // console.log("req_data", req_data)
            
            // Parse user and project as arrays
            let users = req_data.user ? JSON.parse(req_data.user) : [];
            // console.log(users)

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
            console.log("Filter", JSON.stringify(filter))

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