const createError = require("http-errors")
const { technology_skills_services } = require("../../services/index")

module.exports = {
    create_update_technology_skills: async (req, res, next) => {
        try {
            const req_data = req.body;

            const technology_skill = await technology_skills_services.find_technology_skills(req_data.technology_skills);
            if (technology_skill) throw createError.Conflict("technology_skills already define.")

            const technology_skillsData = await technology_skills_services.create_update_technology_skills(req_data.technology_skills, req_data)

            res.status(201).send({
                success: true,
                message: "technology_skills is loaded..",
                data: technology_skillsData
            })
        } catch (error) {
            next(error)
        }
    },
    all_technology_skills: async (req, res, next) => {
        try {

            const alltechnology_skillsData = await technology_skills_services.find_all_technology_skills()

            res.status(201).send({
                success: true,
                message: "get all technology_skills_data",
                data: alltechnology_skillsData
            })
        } catch (error) {
            next(error)
        }
    },
    one_technology_skills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technology_skillsData = await technology_skills_services.find_by_technology_skills_id(id)
            if (!technology_skillsData) throw createError.NotFound("The technology_skillsData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one technology_skills_data",
                data: technology_skillsData
            })
        } catch (error) {
            next(error)
        }
    },
    delete_technology_skills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technology_skillsData = await technology_skills_services.delete_technology_skills(id)
            if (!technology_skillsData) throw createError.NotFound("The technology_skillsData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "technology_skills_data delete successfully",
                data: technology_skillsData
            })
        } catch (error) {
            next(error)
        }
    }
}