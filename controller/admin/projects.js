const createError = require("http-errors")
const { projectServices } = require("../../services/index")

module.exports = {
    createProjects: async (req, res, next) => {
        try {
            const req_data = req.body;

            req_data.technology_skills = await JSON.parse(req_data.technology_skills);

            const project = await projectServices.createProjects(req_data)

            res.status(201).send({
                success: true,
                message: "Project is created successfully.",
                data: project
            })
        } catch (error) {
            next(error)
        }
    },
    allProjects: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const pageSize = 10
            const total = await projectServices.countProjects();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search

            const allProject = await projectServices.findAllProjects(page, pageSize, search)
            if (!allProject) throw createError.NotFound("No any project is found.")

            res.status(201).send({
                success: true,
                message: "All project is fetch successfully.",
                data: allProject,
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
    oneProjects: async (req, res, next) => {
        try {

            const { id } = req.params

            const project = await projectServices.findByProjectsId(id)
            if (!project) throw createError.NotFound("The project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One project is fetch successfully.",
                data: project
            })
        } catch (error) {
            next(error)
        }
    },
    updateProjects: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            req_data.technology_skills = await JSON.parse(req_data.technology_skills);

            const projectData = await projectServices.updateProjects(id, req_data)

            res.status(201).send({
                success: true,
                message: "Project is update successfully.",
                data: projectData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteProjects: async (req, res, next) => {
        try {

            const { id } = req.params

            const project = await projectServices.deleteProjects(id)
            if (!project) throw createError.NotFound("The project with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Project is delete successfully",
                data: project
            })
        } catch (error) {
            next(error)
        }
    }
}