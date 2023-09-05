const createError = require("http-errors")
const { assigned_project_services } = require("../../services/index")

module.exports = {
    create_assigned_project: async (req, res, next) => {
        try {
            const req_data = req.body;

            req_data.project = await JSON.parse(req_data.project);
            req_data.project_category = await JSON.parse(req_data.project_category);

            const assigned_project = await assigned_project_services.create_assigned_project(req_data)

            res.status(201).send({
                success: true,
                message: "Assigned project is created successfully.",
                data: assigned_project
            })
        } catch (error) {
            next(error)
        }
    },
    all_assigned_project: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const pageSize = 2
            const total = await assigned_project_services.count_assigned_project();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search

            const all_assigned_project = await assigned_project_services.find_all_assigned_project(page, pageSize, search)
            if (!all_assigned_project) throw createError.NotFound("No any assigned project is found.")

            res.status(201).send({
                success: true,
                message: "All assigned project is fetch successfully.",
                data: all_assigned_project,
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
    one_assigned_project: async (req, res, next) => {
        try {

            const { id } = req.params

            const assigned_project = await assigned_project_services.find_by_assigned_project_id(id)
            if (!assigned_project) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One assigned project is fetch successfully.",
                data: assigned_project
            })
        } catch (error) {
            next(error)
        }
    },
    update_assigned_project: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            req_data.project = await JSON.parse(req_data.project);
            req_data.project_category = await JSON.parse(req_data.project_category);

            const assigned_project = await assigned_project_services.update_assigned_project(id, req_data)
            if (!assigned_project) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Assigned project is update successfully.",
                data: assigned_project
            })
        } catch (error) {
            next(error)
        }
    },
    delete_assigned_project: async (req, res, next) => {
        try {

            const { id } = req.params

            const assigned_project = await assigned_project_services.delete_assigned_project(id)
            if (!assigned_project) throw createError.NotFound("The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Assigned project is delete successfully",
                data: assigned_project
            })
        } catch (error) {
            next(error)
        }
    }
}