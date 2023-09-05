const createError = require("http-errors")
const { technology_skills_services } = require("../../services/index")

module.exports = {
    create_technology_skills: async (req, res, next) => {
        try {
            const req_data = req.body;

            const technology_skill = await technology_skills_services.find_technology_skills(req_data.technology_skills);
            if (technology_skill) throw createError.Conflict("technology_skills already define.")

            const technology_skills_data = await technology_skills_services.create_technology_skills(req_data)

            res.status(201).send({
                success: true,
                message: "technology_skill is created successfully.",
                data: technology_skills_data
            })
        } catch (error) {
            next(error)
        }
    },
    all_technology_skills: async (req, res, next) => {
        try {

            const technology_skills = await technology_skills_services.find_all_technology_skills()

            res.status(201).send({
                success: true,
                message: "All technology_skills is fetch successfully.",
                data: technology_skills
            })
        } catch (error) {
            next(error)
        }
    },
    one_technology_skills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technology_skills = await technology_skills_services.find_by_technology_skills_id(id)
            if (!technology_skills) throw createError.NotFound("The technology_skill with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One technology_skill is fetch successfully.",
                data: technology_skillsData
            })
        } catch (error) {
            next(error)
        }
    },
    update_technology_skills: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const technology_skill = await technology_skills_services.find_technology_skills(req_data.technology_skills);
            if (technology_skill) throw createError.Conflict("technology_skills already define.")

            const technology_skills_data = await technology_skills_services.update_technology_skills(id, req_data)

            res.status(201).send({
                success: true,
                message: "technology_skill is update successfully.",
                data: technology_skills_data
            })
        } catch (error) {
            next(error)
        }
    },
    delete_technology_skills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technology_skill = await technology_skills_services.delete_technology_skills(id)
            if (!technology_skill) throw createError.NotFound("The technology_skill with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "technology_skill is delete successfully",
                data: technology_skill
            })
        } catch (error) {
            next(error)
        }
    }
}