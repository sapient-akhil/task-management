const createError = require("http-errors")
const { technologySkillsServices } = require("../../services/index")

module.exports = {
    allTechnologySkills: async (req, res, next) => {
        try {

            const alltechnology_skillsData = await technologySkillsServices.findAllTechnologySkills()

            res.status(201).send({
                success: true,
                message: "get all technology_skills_data",
                data: alltechnology_skillsData
            })
        } catch (error) {
            next(error)
        }
    },
    oneTechnologySkills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technology_skillsData = await technologySkillsServices.findByTechnologySkillsId(id)
            if (!technology_skillsData) throw createError.NotFound("The technology_skillsData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one technology_skills_data",
                data: technology_skillsData
            })
        } catch (error) {
            next(error)
        }
    }
}