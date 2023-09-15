const createError = require("http-errors")
const { technologySkillsServices } = require("../../services/index")

module.exports = {
    allTechnologySkills: async (req, res, next) => {
        try {

            const allTechnologySkills = await technologySkillsServices.findAllTechnologySkills()

            res.status(201).send({
                success: true,
                message: "All technology skills is fetch successfully.",
                data: allTechnologySkills
            })
        } catch (error) {
            next(error)
        }
    },
    oneTechnologySkills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technologySkills = await technologySkillsServices.findByTechnologySkillsId(id)
            if (!technologySkills) throw createError.NotFound("The technology skill with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One technology skill is fetch successfully.",
                data: technologySkills
            })
        } catch (error) {
            next(error)
        }
    }
}